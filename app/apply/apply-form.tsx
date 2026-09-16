"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  degree: "",
  graduationYear: "",
  roleWanted: "Software Developer",
  portfolioUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  aboutSelf: "",
};

type FormState = typeof initialForm;

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm(form, resume);

    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (resume) {
      formData.append("resume", resume);
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Could not submit your application. Please try again.");
        return;
      }

      setError("");
      setIsSubmitted(true);
      setForm(initialForm);
      setResume(null);
      event.currentTarget.reset();
    } catch {
      setError("Could not submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-center sm:mt-10 sm:p-7">
        <h2 className="text-xl font-bold sm:text-2xl">Application received.</h2>
        <p className="mt-3 text-sm leading-6 text-white/48">
          Thanks for applying. We saved your details and resume for review.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 w-full rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/60 transition hover:border-white/20 hover:text-white sm:w-auto"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left sm:mt-10 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <TextField label="Full name" value={form.fullName} onChange={(value) => updateField("fullName", value)} required />
        <TextField label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
        <TextField label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} />
        <TextField label="Degree / program" value={form.degree} onChange={(value) => updateField("degree", value)} />
        <TextField label="Graduation year" value={form.graduationYear} onChange={(value) => updateField("graduationYear", value)} placeholder="2027" required />
        <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/32 sm:text-xs sm:tracking-[0.16em]">
          Role wanted
          <select
            value={form.roleWanted}
            onChange={(event) => updateField("roleWanted", event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-black px-4 text-base font-semibold text-white outline-none transition focus:border-white/35 sm:text-sm"
          >
            <option>Software Developer</option>
            <option>Video Editing</option>
          </select>
        </label>
        <TextField label="Portfolio (if applicable)" value={form.portfolioUrl} onChange={(value) => updateField("portfolioUrl", value)} placeholder="https://..." />
        <TextField label="GitHub (if applicable)" value={form.githubUrl} onChange={(value) => updateField("githubUrl", value)} placeholder="https://github.com/..." />
        <TextField label="LinkedIn" value={form.linkedinUrl} onChange={(value) => updateField("linkedinUrl", value)} placeholder="https://linkedin.com/in/..." />
        <ResumeField resume={resume} onChange={setResume} />
      </div>

      <TextArea
        label="Tell something about self"
        value={form.aboutSelf}
        onChange={(value) => updateField("aboutSelf", value)}
        placeholder="Tell us about yourself, what you like building or creating, and anything we should know."
      />

      {error ? <p className="mt-5 text-sm font-semibold text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 min-h-12 w-full rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-7"
      >
        {isSubmitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}

function ResumeField({
  resume,
  onChange,
}: {
  resume: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/32 sm:text-xs sm:tracking-[0.16em]">
      Resume
      <span className="mt-2 flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-black px-4 text-sm font-semibold text-white transition hover:border-white/25">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-black">
          <FileIcon />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-white/75">
            {resume ? resume.name : "Upload resume"}
          </span>
          <span className="mt-0.5 block text-[11px] font-semibold normal-case tracking-normal text-white/32">
            PDF, DOC, or DOCX under 5 MB
          </span>
        </span>
      </span>
      <input
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/32 sm:text-xs sm:tracking-[0.16em]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-black px-4 text-base font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35 sm:text-sm"
        placeholder={placeholder}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="mt-4 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/32 sm:mt-5 sm:text-xs sm:tracking-[0.16em]">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-32 w-full resize-y rounded-lg border border-white/10 bg-black px-4 py-3 text-base font-semibold leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-white/35 sm:min-h-36 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
    </label>
  );
}

function validateForm(form: FormState, resume: File | null) {
  const requiredFields = [
    form.fullName,
    form.email,
    form.graduationYear,
    form.roleWanted,
    form.aboutSelf,
  ];

  if (requiredFields.some((value) => !value.trim())) {
    return "Please complete all required fields.";
  }

  if (form.fullName.trim().length < 2 || form.fullName.trim().length > 100) {
    return "Full name should be between 2 and 100 characters.";
  }

  if (!EMAIL_PATTERN.test(form.email.trim().toLowerCase())) {
    return "Please enter a valid email address.";
  }

  if (!/^\d{4}$/.test(form.graduationYear.trim())) {
    return "Graduation year should be a 4 digit year.";
  }

  if (form.aboutSelf.trim().length < 40) {
    return "Please write at least 40 characters about yourself.";
  }

  if (resume && resume.size > MAX_RESUME_BYTES) {
    return "Resume should be under 5 MB.";
  }

  return "";
}

function FileIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15h6" />
      <path d="M9 18h4" />
    </svg>
  );
}
