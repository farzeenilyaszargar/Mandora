import Image from "next/image";
import type { Metadata } from "next";
import DownloadModalButton from "../components/download-modal";

export const metadata: Metadata = {
  title: "Apply",
  description: "Applications for the Nap student internship are currently closed.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Applications Closed | Nap",
    description: "Applications for the Nap student internship are currently closed.",
    url: "/apply",
  },
  twitter: {
    title: "Applications Closed | Nap",
    description: "Applications for the Nap student internship are currently closed.",
  },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-0 text-white sm:px-4">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col border-x border-white/10">
        <nav className="border-b border-white/10">
          <div className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-3">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <DownloadModalButton />
            </div>
          </div>
        </nav>

        <section className="mx-auto w-full max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="py-12 text-center sm:py-20">
            <h1 className="text-3xl font-bold leading-[1.1] sm:text-4xl">
              Application Closed
            </h1>
            <p className="mx-auto mt-4 max-w-[480px] text-sm leading-7 text-white/48 sm:text-base">
              The deadline for this application has passed. Thank you for your interest in Nap. Please apply next time.
            </p>
          </div>
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-7 text-xs text-white/35 sm:px-8">
          <span>© 2026 Nap</span>
        </footer>
      </div>
    </main>
  );
}
