import Image from "next/image";
import type { Metadata } from "next";
import DownloadModalButton from "../components/download-modal";
import WaitlistForm from "./waitlist-form";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Join the Nap waitlist for upcoming platform releases.",
  alternates: {
    canonical: "/waitlist",
  },
  openGraph: {
    title: "Join the Nap Waitlist",
    description: "Get notified when Nap is ready for your platform.",
    url: "/waitlist",
  },
  twitter: {
    title: "Join the Nap Waitlist",
    description: "Get notified when Nap is ready for your platform.",
  },
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col border-x border-white/10">
        <nav className="border-b border-white/10">
          <div className="flex items-center justify-between px-8 py-3">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="transition hover:text-white">Docs</a>
              <DownloadModalButton />
            </div>
          </div>
        </nav>

        <section className="mx-auto flex max-w-[560px] flex-col items-center px-8 py-24 text-center">
          <h1 className="text-5xl font-bold leading-[1.02] md:text-6xl">
            We&apos;ll save you a seat.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/48">
            Drop your name and email, and we&apos;ll let you know when Nap is ready for your platform.
          </p>

          <WaitlistForm />
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-8 py-8 text-xs text-white/35">
          <span>© 2026 Nap</span>
          <div className="flex flex-wrap gap-5">
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/docs" className="transition hover:text-white">Docs</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
