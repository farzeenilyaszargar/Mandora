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
  roleWanted: "Software dev",
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
      <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.025] p-7 text-left">
        <h2 className="text-2xl font-bold">Application received.</h2>
        <p className="mt-3 text-sm leading-6 text-white/48">
          Thanks for applying. We saved your details and resume for review.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-7 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/60 transition hover:border-white/20 hover:text-white"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 rounded-xl border border-white/10 bg-white/[0.025] p-6 text-left">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Full name" value={form.fullName} onChange={(value) => updateField("fullName", value)} required />
        <TextField label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
        <TextField label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} />
        <TextField label="Degree / program" value={form.degree} onChange={(value) => updateField("degree", value)} />
        <TextField label="Graduation year" value={form.graduationYear} onChange={(value) => updateField("graduationYear", value)} placeholder="2027" required />
        <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
          Role wanted
          <select
            value={form.roleWanted}
            onChange={(event) => updateField("roleWanted", event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-white/35"
          >
            <option>Software dev</option>
            <option>Video editing</option>
          </select>
        </label>
        <TextField label="Portfolio (if applicable)" value={form.portfolioUrl} onChange={(value) => updateField("portfolioUrl", value)} placeholder="https://..." />
        <TextField label="GitHub (if applicable)" value={form.githubUrl} onChange={(value) => updateField("githubUrl", value)} placeholder="https://github.com/..." />
        <TextField label="LinkedIn" value={form.linkedinUrl} onChange={(value) => updateField("linkedinUrl", value)} placeholder="https://linkedin.com/in/..." />
        <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
          Resume
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => setResume(event.target.files?.[0] ?? null)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-bold file:text-black"
          />
        </label>
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
        className="mt-7 w-full rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
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
    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35"
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
    <label className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-36 w-full resize-y rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/35"
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
