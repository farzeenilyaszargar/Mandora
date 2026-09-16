import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://ywfkomtyadqkyugiibhi.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESUME_BUCKET = "internship-resumes";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/[^\s]+$/i;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  degree: string;
  graduationYear: string;
  roleWanted: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  aboutSelf: string;
  resume: File | null;
};

export async function POST(request: Request) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Applications are not configured yet." },
      { status: 500 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const application = normalizeApplication(formData);
  const validationError = validateApplication(application);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const resumeUpload = application.resume
    ? await uploadResume(application.email, application.resume)
    : { path: "", filename: "", mimeType: "" };

  if ("error" in resumeUpload) {
    return NextResponse.json({ error: resumeUpload.error }, { status: 500 });
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
      degree: application.degree || null,
      graduation_year: application.graduationYear,
      role_wanted: application.roleWanted,
      portfolio_url: application.portfolioUrl || null,
      github_url: application.githubUrl || null,
      linkedin_url: application.linkedinUrl || null,
      about_self: application.aboutSelf,
      resume_path: resumeUpload.path || null,
      resume_filename: resumeUpload.filename || null,
      resume_mime_type: resumeUpload.mimeType || null,
      source: "internship_application",
      user_agent: request.headers.get("user-agent"),
    }),
  }).catch(() => null);

  if (!response) {
    return NextResponse.json(
      { error: "Could not reach Supabase. Please make sure the project is unpaused." },
      { status: 503 },
    );
  }

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

function normalizeApplication(formData: FormData): ApplicationPayload {
  const resume = formData.get("resume");

  return {
    fullName: normalizeText(getString(formData, "fullName")),
    email: getString(formData, "email").trim().toLowerCase(),
    phone: normalizeText(getString(formData, "phone")),
    degree: normalizeText(getString(formData, "degree")),
    graduationYear: normalizeText(getString(formData, "graduationYear")),
    roleWanted: normalizeText(getString(formData, "roleWanted")),
    portfolioUrl: getString(formData, "portfolioUrl").trim(),
    githubUrl: getString(formData, "githubUrl").trim(),
    linkedinUrl: getString(formData, "linkedinUrl").trim(),
    aboutSelf: normalizeText(getString(formData, "aboutSelf")),
    resume: resume instanceof File && resume.size > 0 ? resume : null,
  };
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
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

  if (!/^\d{4}$/.test(application.graduationYear)) {
    return "Graduation year should be a 4 digit year.";
  }

  if (!["Software Developer", "Video Editing"].includes(application.roleWanted)) {
    return "Please select a valid role.";
  }

  if (application.aboutSelf.length < 40 || application.aboutSelf.length > 1500) {
    return "Tell us about yourself in 40 to 1500 characters.";
  }

  if (application.resume) {
    if (application.resume.size > MAX_RESUME_BYTES) {
      return "Resume should be under 5 MB.";
    }

    if (!ALLOWED_RESUME_TYPES.has(application.resume.type)) {
      return "Resume should be a PDF, DOC, or DOCX file.";
    }
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

async function uploadResume(email: string, resume: File) {
  const safeEmail = email.replace(/[^a-z0-9.-]/gi, "_");
  const extension = resume.name.split(".").pop()?.toLowerCase() || "file";
  const path = `${safeEmail}/${Date.now()}.${extension}`;

  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${RESUME_BUCKET}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": resume.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: resume,
  }).catch(() => null);

  if (!response || !response.ok) {
    return { error: "Could not upload your resume. Please try again." };
  }

  return {
    path,
    filename: resume.name,
    mimeType: resume.type,
  };
}
