"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  university: "",
  degree: "",
  graduationYear: "",
  location: "",
  roleTrack: "Product Engineering",
  portfolioUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  availabilityStart: "",
  weeklyHours: "",
  whyNap: "",
  experience: "",
};

type FormState = typeof initialForm;

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Could not submit your application. Please try again.");
        return;
      }

      setError("");
      setIsSubmitted(true);
      setForm(initialForm);
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
          Thanks for applying. We saved your details and will review them against the internship brief.
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
        <TextField label="Location" value={form.location} onChange={(value) => updateField("location", value)} />
        <TextField label="University" value={form.university} onChange={(value) => updateField("university", value)} required />
        <TextField label="Degree / program" value={form.degree} onChange={(value) => updateField("degree", value)} />
        <TextField label="Graduation year" value={form.graduationYear} onChange={(value) => updateField("graduationYear", value)} placeholder="2027" required />
        <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
          Internship track
          <select
            value={form.roleTrack}
            onChange={(event) => updateField("roleTrack", event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-white/35"
          >
            <option>Product Engineering</option>
            <option>Design</option>
            <option>Growth / Content</option>
            <option>Operations</option>
            <option>General</option>
          </select>
        </label>
        <TextField label="Portfolio" value={form.portfolioUrl} onChange={(value) => updateField("portfolioUrl", value)} placeholder="https://..." />
        <TextField label="GitHub" value={form.githubUrl} onChange={(value) => updateField("githubUrl", value)} placeholder="https://github.com/..." />
        <TextField label="LinkedIn" value={form.linkedinUrl} onChange={(value) => updateField("linkedinUrl", value)} placeholder="https://linkedin.com/in/..." />
        <TextField label="Availability" value={form.availabilityStart} onChange={(value) => updateField("availabilityStart", value)} placeholder="From January, remote, etc." />
        <TextField label="Weekly hours" value={form.weeklyHours} onChange={(value) => updateField("weeklyHours", value)} placeholder="10-20" />
      </div>

      <TextArea
        label="Why do you want to join Nap?"
        value={form.whyNap}
        onChange={(value) => updateField("whyNap", value)}
        placeholder="Tell us what caught your attention and what you want to learn or build."
      />
      <TextArea
        label="Relevant experience"
        value={form.experience}
        onChange={(value) => updateField("experience", value)}
        placeholder="Share projects, internships, open-source work, design samples, writing, or anything else that matters."
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
        className="mt-2 min-h-32 w-full resize-y rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/35"
        placeholder={placeholder}
      />
    </label>
  );
}

function validateForm(form: FormState) {
  const requiredFields = [
    form.fullName,
    form.email,
    form.university,
    form.graduationYear,
    form.roleTrack,
    form.whyNap,
    form.experience,
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

  if (form.whyNap.trim().length < 40 || form.experience.trim().length < 40) {
    return "Please write at least 40 characters for both short answers.";
  }

  return "";
}
