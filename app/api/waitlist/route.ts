import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://ywfkomtyadqkyugiibhi.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Waitlist is not configured yet." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isWaitlistPayload(payload)) {
    return NextResponse.json(
      { error: "Please add a valid name and email." },
      { status: 400 },
    );
  }

  const name = payload.name.trim().replace(/\s+/g, " ");
  const email = payload.email.trim().toLowerCase();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { error: "Name should be between 2 and 80 characters." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/wishlist_saves`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      email,
      source: "waitlist",
      user_agent: request.headers.get("user-agent"),
    }),
  });

  if (response.status === 409) {
    return NextResponse.json(
      { message: "You are already on the list." },
      { status: 200 },
    );
  }

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { code?: string } | null;

    if (errorPayload?.code === "PGRST205") {
      return NextResponse.json(
        { error: "Waitlist table is not ready yet." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "You are on the list." });
}

function isWaitlistPayload(payload: unknown): payload is { name: string; email: string } {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "name" in payload &&
    "email" in payload &&
    typeof payload.name === "string" &&
    typeof payload.email === "string"
  );
}
