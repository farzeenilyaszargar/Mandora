"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DownloadModalButton from "./components/download-modal";

const trustedLogos = [
  { name: "Nestle", src: "/nestle-logo.png", width: 1280, height: 352, className: "h-5 w-auto brightness-0 invert" },
  { name: "SAEL", src: "/sael-logo.png", width: 1869, height: 474, className: "h-5 w-auto brightness-0 invert" },
  { name: "Domino's", src: "/dominos-logo.png", width: 555, height: 209, className: "h-12 w-auto brightness-0 invert" },
  { name: "CP PLUS", src: "/cp-plus-logo.png", width: 1895, height: 300, className: "h-5 w-auto brightness-0 invert" },
  { name: "Healthkart", src: "/healthkart-logo.png", width: 646, height: 220, className: "h-11 w-auto brightness-0 invert" },
];

const subscriptionAgents = [
  { name: "Claude Code", src: "/opencode-agent-logo.png" },
  { name: "Codex CLI", src: "/claude-code-agent-logo.png" },
  { name: "OpenCode", src: "/cursor-agent-logo.png" },
  { name: "Cursor", src: "/codex-cli-agent-logo.png" },
  { name: "Grok CLI", src: "/grok-cli-agent-logo.png" },
];

const features = [
  {
    icon: "spark",
    title: "Native to your workflow",
    description:
      "Nap keeps every agent close to the machine, your files, and the work already in motion.",
  },
  {
    icon: "layers",
    title: "Every agent, one place",
    description:
      "Run Claude Code, Codex CLI, OpenCode, Cursor, and Grok CLI without switching context.",
  },
  {
    icon: "key",
    title: "Bring your own keys",
    description:
      "Use the subscriptions and accounts you already have. Nap stays out of the way.",
  },
  {
    icon: "command",
    title: "Keyboard first",
    description:
      "Start sessions, jump through work, and keep momentum without reaching for the mouse.",
  },
  {
    icon: "disk",
    title: "Local by design",
    description:
      "Projects, sessions, transcripts, and provider IDs stay grounded around your machine.",
  },
  {
    icon: "refresh",
    title: "Quietly current",
    description:
      "A clean desktop layer for fast-moving agent tools, without turning your workspace into noise.",
  },
];

type DownloadPlatform = {
  label: string;
  icon: "apple" | "windows" | "linux";
  href: string;
  download: boolean;
};

const macDownloadUrl = "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

const defaultDownloadPlatform: DownloadPlatform = {
  label: "macOS",
  icon: "apple",
  href: macDownloadUrl,
  download: false,
};

export default function Home() {
  const [downloadPlatform, setDownloadPlatform] = useState<DownloadPlatform>(defaultDownloadPlatform);

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (platform.includes("win") || userAgent.includes("windows")) {
      setDownloadPlatform({
        label: "Windows",
        icon: "windows",
        href: "/waitlist",
        download: false,
      });
      return;
    }

    if (platform.includes("linux") || userAgent.includes("linux")) {
      setDownloadPlatform({
        label: "Linux",
        icon: "linux",
        href: "/waitlist",
        download: false,
      });
      return;
    }

    setDownloadPlatform(defaultDownloadPlatform);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col border-x border-white/10">
        <nav className="border-b border-white/10">
          <div className="flex items-center justify-between px-8 py-3">
            <a href="/" className="flex items-center gap-3 text-sm font-bold">
              <Image className="brightness-0 invert" src="/logo.png" alt="Nap" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="transition hover:text-white">Docs</a>
              <DownloadModalButton />
            </div>
          </div>
        </nav>

        <section className="px-8 pb-16 pt-24 text-center">
          <div className="mx-auto flex  flex-col items-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/55">
              <span className="mr-1 inline-flex min-w-[5ch] justify-end overflow-hidden align-bottom font-bold text-white/75">
                +3642
              </span>
              People Using Worldwide
            </div>
            <h1 className="mx-auto mt-8 w-full text-5xl font-bold leading-[1.02] text-white md:whitespace-nowrap md:text-6xl">
              The Interface That Loves You
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-lg leading-8 text-white/48">
              Nap brings your agent CLIs into one fast workspace for sessions, context, commands, and handoffs.
            </p>
            <div className="mt-9 flex items-center justify-center gap-5">
              <DownloadButton platform={downloadPlatform} />
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">
              Bring your own subscriptions
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
              {subscriptionAgents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                  <Image className="h-6 w-6 rounded-md object-cover" src={agent.src} alt="" width={64} height={64} />
                  <span className="text-xs font-semibold text-white/70">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[url('/cloud-bg.png')] bg-cover bg-center px-8 py-16">
          <div className="mx-auto max-w-[930px]">
            <Image
              className="w-full rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
              src="/heros.png"
              alt="Nap app preview"
              width={1200}
              height={1000}
              priority
            />
          </div>
        </section>

        <section className="px-8 py-20 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">
            Trusted by builders across the industry
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-11 gap-y-7">
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

        <section className="border-y border-white/10">
          <div className="grid md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="flex min-h-48 flex-col justify-center border-b border-white/10 px-8 py-8 text-left md:border-r md:[&:nth-child(3n)]:border-r-0">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-white">
                    <FeatureIcon name={feature.icon} />
                  </span>
                  <h2 className="text-base font-bold text-white">{feature.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/45">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 bg-[url('/cloud-bg.png')] bg-cover bg-center px-8 py-25 text-center">
          <h2 className="text-4xl font-bold text-black">Let Nap Take It From Here</h2>
          <div className="mt-7 flex items-center justify-center gap-5">
            <DownloadButton platform={downloadPlatform} />
          </div>
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-8 py-8 text-xs text-white/35">
          <span>© 2026 Nap</span>
          <div className="flex flex-wrap gap-5">
            <a href="/docs" className="transition hover:text-white">Docs</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function DownloadButton({ platform }: { platform: DownloadPlatform }) {
  return (
    <a
      href={platform.href}
      download={platform.download || undefined}
      className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8]"
    >
      Download for {platform.label}
      <PlatformIcon name={platform.icon} />
    </a>
  );
}

function PlatformIcon({ name }: { name: DownloadPlatform["icon"] }) {
  const props = {
    className: "h-4 w-4",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "apple") {
    return (
      <svg {...props}>
        <path d="M16.4 13.1c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.2-.8-1.7 0-3.2 1-4 2.5-1.7 2.9-.4 7.1 1.2 9.4.8 1.1 1.7 2.4 3 2.3 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8s2.2-1.1 3-2.3c.9-1.3 1.3-2.6 1.3-2.7-.1-.1-2.5-1-2.5-3.7z" />
        <path d="M14 5.9c.7-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.9-1 2.9 1 .1 2-.5 2.7-1.3z" />
      </svg>
    );
  }

  if (name === "windows") {
    return (
      <svg {...props}>
        <path d="M3 5.2 10.8 4v7.5H3V5.2z" />
        <path d="M12 3.8 21 2.5v9h-9V3.8z" />
        <path d="M3 12.7h7.8v7.4L3 18.9v-6.2z" />
        <path d="M12 12.7h9v8.8l-9-1.3v-7.5z" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M12 2.2c-2.1 0-3.8 1.7-3.8 3.9 0 1.4.7 2.5 1.4 3.2-1.4.8-2.4 2.4-2.4 4.3 0 3 2.2 5.3 4.8 5.3s4.8-2.3 4.8-5.3c0-1.9-1-3.5-2.4-4.3.7-.7 1.4-1.8 1.4-3.2 0-2.2-1.7-3.9-3.8-3.9zM9 19.7l-2.2 1.7c-.4.3-1 .2-1.3-.2-.3-.4-.2-1 .2-1.3l2-1.5c.4.5.8.9 1.3 1.3zm6 0c.5-.4.9-.8 1.3-1.3l2 1.5c.4.3.5.9.2 1.3-.3.4-.9.5-1.3.2L15 19.7z" />
    </svg>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const sharedProps = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9,
    viewBox: "0 0 24 24",
  };

  if (name === "spark") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <path d="M12 3l1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3z" />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z" />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <path d="M12 4l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 16l8 4 8-4" />
      </svg>
    );
  }

  if (name === "key") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <circle cx="8" cy="15" r="3" />
        <path d="M10.2 12.8L20 3" />
        <path d="M15 8l2 2" />
        <path d="M17 6l2 2" />
      </svg>
    );
  }

  if (name === "command") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h.01" />
        <path d="M11 10h.01" />
        <path d="M15 10h.01" />
        <path d="M17 14h.01" />
        <path d="M7 14h6" />
      </svg>
    );
  }

  if (name === "disk") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <path d="M6 3h10l3 3v15H5V3h1z" />
        <path d="M8 3v6h8V3" />
        <path d="M8 17h8" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps} aria-hidden="true">
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M18.1 9A7 7 0 0 0 6.3 6.8L4 9" />
      <path d="M5.9 15A7 7 0 0 0 17.7 17.2L20 15" />
    </svg>
  );
}
