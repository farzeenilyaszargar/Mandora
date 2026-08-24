import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Bring Nap to engineering teams with centralized agent workflows, workspace policies, onboarding, and support.",
  alternates: {
    canonical: "/enterprise",
  },
  openGraph: {
    title: "Nap Enterprise",
    description:
      "Standardize how teams launch, observe, and resume coding agent work across projects.",
    url: "/enterprise",
  },
  twitter: {
    title: "Nap Enterprise",
    description:
      "Agent workflows, onboarding, and workspace policy controls for teams using Nap.",
  },
};

const benefits = [
  "Centralized rollout for engineering teams",
  "Bring existing provider subscriptions and keys",
  "Workspace policies for projects and repos",
  "Onboarding support for agent-heavy teams",
  "Shared defaults for models, prompts, and tools",
  "Quiet controls for security-conscious work",
];

const trustedLogos = [
  { name: "Nestle", src: "/nestle-logo.png", width: 1280, height: 352, className: "h-5 w-auto" },
  { name: "SAEL", src: "/sael-logo.png", width: 1869, height: 474, className: "h-5 w-auto" },
  { name: "Domino's", src: "/dominos-logo.png", width: 555, height: 209, className: "h-11 w-auto" },
  { name: "CP PLUS", src: "/cp-plus-logo.png", width: 1895, height: 300, className: "h-5 w-auto" },
  { name: "Healthkart", src: "/healthkart-logo.png", width: 646, height: 220, className: "h-10 w-auto" },
];

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto min-h-screen max-w-[1120px] border-x border-white/10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/75 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-4">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="transition hover:text-white">Docs</a>
              <a href="/enterprise" className="text-white">Enterprise</a>
              <a href="/download" className="rounded-md bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-[#d8d8d8]">
                Download
              </a>
            </div>
          </div>
        </nav>

        <section className="grid border-b border-white/10 md:grid-cols-[1fr_420px]">
          <div className="px-8 py-24">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">Enterprise</p>
            <h1 className="mt-6 max-w-[640px] text-5xl font-bold leading-[1.02] md:text-6xl">
              Put agent work on rails for the whole team.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-white/48">
              Nap for Enterprise helps teams standardize how coding agents are launched, observed, and resumed across projects.
            </p>

            <div className="mt-12 grid max-w-[720px] gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/62">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-bold text-white/45">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="border-t border-white/10 bg-white/[0.025] px-8 py-24 md:border-l md:border-t-0">
            <h2 className="text-2xl font-bold">Talk to us</h2>
            <p className="mt-3 text-sm leading-6 text-white/45">
              Share a few details and the Nap team can help map the right setup.
            </p>

            <label className="mt-8 block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
              Name
              <input className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35" placeholder="Jane Cooper" />
            </label>

            <label className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
              Work email
              <input type="email" className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35" placeholder="jane@company.com" />
            </label>

            <label className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
              Company size
              <select className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-white/35">
                <option>1-10 builders</option>
                <option>11-50 builders</option>
                <option>51-250 builders</option>
                <option>250+ builders</option>
              </select>
            </label>

            <label className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-white/32">
              What do you want Nap to solve?
              <textarea className="mt-2 min-h-32 w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-white/35" placeholder="Agent access, onboarding, project policies, team workflows..." />
            </label>

            <button type="button" className="mt-7 w-full rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8]">
              Request enterprise access
            </button>
          </form>
        </section>

        <section className="border-b border-white/10 px-8 py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">
            Trusted by brands
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-11 gap-y-7">
            {trustedLogos.map((logo) => (
              <Image
                key={logo.name}
                className={logo.className}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
              />
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 px-8 py-8 text-xs text-white/35">
          <span>© 2026 Nap</span>
          <div className="flex flex-wrap gap-5">
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/docs" className="transition hover:text-white">Docs</a>
            <a href="/download" className="transition hover:text-white">Download</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
