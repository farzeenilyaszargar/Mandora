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
      <div className="mt-8 text-center sm:mt-10">
        <h2 className="text-lg font-bold sm:text-2xl">You&apos;re on the list.</h2>
        <p className="mt-3 text-xs leading-5 text-white/48 sm:text-sm sm:leading-6">
          We saved your spot and will reach out when the next Nap build is ready.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-white/60 transition hover:border-white/20 hover:text-white sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
        >
          Add another person
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-[520px] text-left sm:mt-10">
      <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/32 sm:text-xs sm:tracking-[0.16em]">
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-black px-3 text-xs font-semibold text-white outline-none transition placeholder:text-xs placeholder:text-white/20 focus:border-white/35 sm:h-12 sm:px-4 sm:text-sm sm:placeholder:text-sm"
          placeholder="Your name"
        />
      </label>

      <label className="mt-4 block text-[10px] font-bold uppercase tracking-[0.12em] text-white/32 sm:mt-5 sm:text-xs sm:tracking-[0.16em]">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-black px-3 text-xs font-semibold text-white outline-none transition placeholder:text-xs placeholder:text-white/20 focus:border-white/35 sm:h-12 sm:px-4 sm:text-sm sm:placeholder:text-sm"
          placeholder="you@example.com"
        />
      </label>

      {error ? <p className="mt-5 text-xs font-semibold text-red-300 sm:text-sm">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 min-h-11 w-full rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#d8d8d8] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-7 sm:min-h-12 sm:px-5 sm:py-3 sm:text-sm"
      >
        {isSubmitting ? "Joining..." : "Join waitlist"}
      </button>
    </form>
  );
}
