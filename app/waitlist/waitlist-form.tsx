"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim().replace(/\s+/g, " ");
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      setError("Please add your name and email.");
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 80) {
      setError("Name should be between 2 and 80 characters.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail) || trimmedEmail.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Could not join the waitlist. Please try again.");
        return;
      }

      setError("");
      setIsSubmitted(true);
      setName("");
      setEmail("");
    } catch {
      setError("Could not join the waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="mt-12 w-full rounded-xl border border-white/10 bg-white/[0.025] p-6 text-left">
        <h2 className="text-2xl font-bold">You&apos;re on the list.</h2>
        <p className="mt-3 text-sm leading-6 text-white/48">
          We saved your spot and will reach out when the next Nap build is ready.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-7 w-full rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/60 transition hover:border-white/20 hover:text-white"
        >
          Add another person
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 w-full rounded-xl border border-white/10 bg-white/[0.025] p-6 text-left">
      <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35"
          placeholder="Your name"
        />
      </label>

      <label className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35"
          placeholder="you@example.com"
        />
      </label>

      {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Joining..." : "Join waitlist"}
      </button>
    </form>
  );
}
