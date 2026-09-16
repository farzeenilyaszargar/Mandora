import Image from "next/image";
import type { Metadata } from "next";
import DownloadModalButton from "../components/download-modal";
import ApplyForm from "./apply-form";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for a Nap student internship.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply for a Nap Internship",
    description: "Submit your student internship application for Nap.",
    url: "/apply",
  },
  twitter: {
    title: "Apply for a Nap Internship",
    description: "Submit your student internship application for Nap.",
  },
};

export default function ApplyPage() {
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

        <section className="mx-auto w-full max-w-[820px] px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold leading-[1.02] md:text-6xl">
              Student internship application
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-lg leading-8 text-white/48">
              Use this form if you&apos;re applying through the internship email. Share the details we need to review your fit and follow up.
            </p>
          </div>

          <ApplyForm />
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
