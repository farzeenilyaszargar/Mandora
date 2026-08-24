"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const trustedLogos = [
  { name: "Nestle", src: "/nestle-logo.png", width: 1280, height: 352, className: "h-5 w-auto" },
  { name: "SAEL", src: "/sael-logo.png", width: 1869, height: 474, className: "h-5 w-auto" },
  { name: "Domino's", src: "/dominos-logo.png", width: 555, height: 209, className: "h-11 w-auto" },
  { name: "CP PLUS", src: "/cp-plus-logo.png", width: 1895, height: 300, className: "h-5 w-auto" },
  { name: "Healthkart", src: "/healthkart-logo.png", width: 646, height: 220, className: "h-10 w-auto" },
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

export default function Home() {
  const [peopleCount, setPeopleCount] = useState(0);
  const [isInitialCounting, setIsInitialCounting] = useState(true);
  const previousPeopleCount = usePrevious(peopleCount);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const peopleCountDigits = peopleCount.toString();
  const previousCountDigits = (previousPeopleCount ?? peopleCount)
    .toString()
    .padStart(peopleCountDigits.length, "0");

  useEffect(() => {
    const targetCount = 9489;
    const loadDuration = 1800;
    const loadSteps = 72;
    let currentStep = 0;

    const scheduleIncrease = () => {
      const delay = (Math.floor(Math.random() * 6) + 5) * 1000;

      timeoutRef.current = setTimeout(() => {
        setPeopleCount((count) => count + (Math.random() < 0.8 ? 1 : 2));
        scheduleIncrease();
      }, delay);
    };

    intervalRef.current = setInterval(() => {
      currentStep += 1;

      const progress = Math.min(currentStep / loadSteps, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setPeopleCount(Math.floor(targetCount * easedProgress));

      if (progress < 1) {
        return;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setPeopleCount(targetCount);
      setIsInitialCounting(false);
      scheduleIncrease();
    }, loadDuration / loadSteps);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto min-h-screen max-w-[1120px] border-x border-white/10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/75 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-4">
            <a href="/" className="flex items-center gap-3 text-sm font-bold">
              <Image className="brightness-0 invert" src="/logo.png" alt="Nap" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="transition hover:text-white">Docs</a>
              <a href="/enterprise" className="transition hover:text-white">Enterprise</a>
              <a href="/download" className="rounded-md bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-[#d8d8d8]">
                Download
              </a>
            </div>
          </div>
        </nav>

        <section className="px-8 pb-16 pt-28 text-center">
          <div className="mx-auto flex max-w-[650px] flex-col items-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/55">
              <span className="mr-1 inline-flex min-w-[5ch] justify-end overflow-hidden align-bottom font-bold text-white/75">
                <span>+</span>
                {peopleCountDigits
                  .split("")
                  .map((digit, index) => {
                    const didDigitChange = !isInitialCounting && previousCountDigits[index] !== digit;

                    return (
                      <span
                        key={didDigitChange ? `${index}-${digit}-${peopleCount}` : index}
                        className={didDigitChange ? "animate-counter-digit-slide inline-block" : "inline-block"}
                        style={{ animationDelay: `${index * 18}ms` }}
                      >
                        {digit}
                      </span>
                    );
                  })}
              </span>
              People Using Worldwide
            </div>
            <h1 className="mx-auto mt-8 max-w-[920px] text-5xl font-bold leading-[1.02] text-white md:whitespace-nowrap md:text-6xl">
              The Interface That Loves You
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-lg leading-8 text-white/48">
              Nap brings your agent CLIs into one fast workspace for sessions, context, commands, and handoffs.
            </p>
            <div className="mt-9 flex items-center justify-center gap-5">
              <a
                href="/download.txt"
                download
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8]"
              >
                <span aria-hidden="true">↓</span>
                Download
              </a>
              <span className="font-mono text-xs font-bold text-white/35">v0.0.12</span>
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
              <article key={feature.title} className="flex min-h-48 flex-col items-center border-b border-white/10 px-8 py-8 text-center md:border-r md:[&:nth-child(3n)]:border-r-0">
                <span className="mb-7 flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/28">
                  <FeatureIcon name={feature.icon} />
                </span>
                <h2 className="text-base font-bold text-white">{feature.title}</h2>
                <p className="mt-4 text-sm leading-6 text-white/45">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 px-8 py-20 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">
            Download
          </p>
          <h2 className="mt-5 text-3xl font-bold">Get Nap</h2>
          <div className="mt-7 flex items-center justify-center gap-5">
            <a
              href="/download.txt"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d8d8d8]"
            >
              <span aria-hidden="true">↓</span>
              Download
            </a>
            <span className="font-mono text-xs font-bold text-white/35">v0.0.12</span>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 px-8 py-8 text-xs text-white/35">
          <span>© 2026 Nap</span>
          <div className="flex flex-wrap gap-5">
            <a href="/docs" className="transition hover:text-white">Docs</a>
            <a href="/enterprise" className="transition hover:text-white">Enterprise</a>
            <a href="/download" className="transition hover:text-white">Download</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
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
        <path d="M9 9H7.5A2.5 2.5 0 1 1 10 6.5V17.5A2.5 2.5 0 1 1 7.5 15H15" />
        <path d="M15 15h1.5A2.5 2.5 0 1 0 14 17.5V6.5A2.5 2.5 0 1 0 16.5 9H9" />
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
