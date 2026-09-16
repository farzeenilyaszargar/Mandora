import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://ywfkomtyadqkyugiibhi.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/[^\s]+$/i;

type ApplicationPayload = {
  fullName: string;
  email: string;
  phone?: string;
  university: string;
  degree?: string;
  graduationYear: string;
  location?: string;
  roleTrack: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  availabilityStart?: string;
  weeklyHours?: string;
  whyNap: string;
  experience: string;
};

export async function POST(request: Request) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Applications are not configured yet." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isApplicationPayload(payload)) {
    return NextResponse.json(
      { error: "Please complete the required application fields." },
      { status: 400 },
    );
  }

  const application = normalizeApplication(payload);
  const validationError = validateApplication(application);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/internship_applications`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: application.fullName,
      email: application.email,
      phone: application.phone || null,
      university: application.university,
      degree: application.degree || null,
      graduation_year: application.graduationYear,
      location: application.location || null,
      role_track: application.roleTrack,
      portfolio_url: application.portfolioUrl || null,
      github_url: application.githubUrl || null,
      linkedin_url: application.linkedinUrl || null,
      availability_start: application.availabilityStart || null,
      weekly_hours: application.weeklyHours || null,
      why_nap: application.whyNap,
      experience: application.experience,
      source: "internship_application",
      user_agent: request.headers.get("user-agent"),
    }),
  });

  if (response.status === 409) {
    return NextResponse.json(
      { error: "An application with this email already exists." },
      { status: 409 },
    );
  }

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { code?: string } | null;

    if (errorPayload?.code === "PGRST205") {
      return NextResponse.json(
        { error: "Applications table is not ready yet." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Could not submit your application. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Application submitted." });
}

function isApplicationPayload(payload: unknown): payload is ApplicationPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "fullName" in payload &&
    "email" in payload &&
    "university" in payload &&
    "graduationYear" in payload &&
    "roleTrack" in payload &&
    "whyNap" in payload &&
    "experience" in payload &&
    typeof payload.fullName === "string" &&
    typeof payload.email === "string" &&
    typeof payload.university === "string" &&
    typeof payload.graduationYear === "string" &&
    typeof payload.roleTrack === "string" &&
    typeof payload.whyNap === "string" &&
    typeof payload.experience === "string"
  );
}

function normalizeApplication(payload: ApplicationPayload): ApplicationPayload {
  return {
    fullName: normalizeText(payload.fullName),
    email: payload.email.trim().toLowerCase(),
    phone: normalizeText(payload.phone ?? ""),
    university: normalizeText(payload.university),
    degree: normalizeText(payload.degree ?? ""),
    graduationYear: normalizeText(payload.graduationYear),
    location: normalizeText(payload.location ?? ""),
    roleTrack: normalizeText(payload.roleTrack),
    portfolioUrl: payload.portfolioUrl?.trim() ?? "",
    githubUrl: payload.githubUrl?.trim() ?? "",
    linkedinUrl: payload.linkedinUrl?.trim() ?? "",
    availabilityStart: normalizeText(payload.availabilityStart ?? ""),
    weeklyHours: normalizeText(payload.weeklyHours ?? ""),
    whyNap: normalizeText(payload.whyNap),
    experience: normalizeText(payload.experience),
  };
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function validateApplication(application: ApplicationPayload) {
  if (application.fullName.length < 2 || application.fullName.length > 100) {
    return "Full name should be between 2 and 100 characters.";
  }

  if (!EMAIL_PATTERN.test(application.email) || application.email.length > 254) {
    return "Please enter a valid email address.";
  }

  if (application.university.length < 2 || application.university.length > 140) {
    return "University should be between 2 and 140 characters.";
  }

  if (!/^\d{4}$/.test(application.graduationYear)) {
    return "Graduation year should be a 4 digit year.";
  }

  if (application.roleTrack.length < 2 || application.roleTrack.length > 80) {
    return "Please select an internship track.";
  }

  if (application.whyNap.length < 40 || application.whyNap.length > 1200) {
    return "Tell us why you want to join in 40 to 1200 characters.";
  }

  if (application.experience.length < 40 || application.experience.length > 1200) {
    return "Tell us about your experience in 40 to 1200 characters.";
  }

  for (const [label, value] of [
    ["Portfolio", application.portfolioUrl],
    ["GitHub", application.githubUrl],
    ["LinkedIn", application.linkedinUrl],
  ]) {
    if (value && (!URL_PATTERN.test(value) || value.length > 300)) {
      return `${label} link should be a valid URL starting with http:// or https://.`;
    }
  }

  return "";
}
