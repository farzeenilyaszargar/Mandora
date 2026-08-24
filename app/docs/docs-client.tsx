"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DownloadModalButton from "../components/download-modal";

const navItems = [
  "Overview",
  "Installation",
  "Connect agents",
  "Projects",
  "Sessions",
  "Shortcuts",
  "Preferences",
  "Troubleshooting",
];

const docPages = [
  {
    id: "overview",
    title: "Overview",
    body: "Nap is a native command center for coding agents. It keeps Claude Code, Codex CLI, Cursor, OpenCode, and Grok CLI in one focused surface so every run has context, history, and a clean way back.",
    callout: "Think of Nap as the operating desk for agent work: launch, observe, compare, resume.",
  },
  {
    id: "installation",
    title: "Installation",
    body: "Download the macOS build, move Nap into Applications, then open a project folder. Nap will check for supported CLIs and show which providers are ready to use.",
    callout: "For now the download button uses a placeholder file while the installer is prepared.",
  },
  {
    id: "connect-agents",
    title: "Connect agents",
    body: "Nap uses the accounts and keys you already configured through first-party tools. If Claude Code, Codex CLI, Cursor, OpenCode, or Grok CLI are authenticated locally, Nap can route work to them.",
    callout: "No new provider account is required to test the core workflow.",
  },
  {
    id: "projects",
    title: "Projects",
    body: "A project is a local workspace with its own preferred agents, instructions, recent sessions, and file activity. Nap keeps each workspace quiet and separate.",
    callout: "Use project defaults when one repo prefers Codex while another works better with Claude Code.",
  },
  {
    id: "sessions",
    title: "Sessions",
    body: "Every prompt creates a session with the selected provider. Nap tracks the request, response, notes, run status, and workspace activity so you can resume without rebuilding context.",
    callout: "Sessions are designed for messy real work: starts, stops, revisions, and handoffs.",
  },
  {
    id: "shortcuts",
    title: "Shortcuts",
    body: "Nap is keyboard-first. Use shortcuts to open the command palette, start a run, switch providers, jump to the previous session, and move through the timeline.",
    callout: "The goal is fewer clicks when you are already thinking in code.",
  },
  {
    id: "preferences",
    title: "Preferences",
    body: "Set default agents per project, choose how dense the interface feels, tune notification behavior, and decide which provider should be first in the launcher.",
    callout: "Preferences are intentionally local so each machine can match the way you actually work.",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    body: "If an agent does not appear, confirm the CLI is installed, authenticated, and available in your shell path. Nap surfaces provider checks so setup problems are easier to spot.",
    callout: "Most issues come from missing local authentication or a CLI that is not reachable from the app environment.",
  },
];

const snippets = [
  ["Check local agents", "nap agents"],
  ["Open a workspace", "nap open ~/code/app"],
  ["Start a Codex run", "nap run codex"],
  ["Resume previous work", "nap resume last"],
];

export default function DocsClient() {
  const [activeTopic, setActiveTopic] = useState(0);
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);
  const markerIndex = hoveredTopic ?? activeTopic;

  useEffect(() => {
    const sections = docPages
      .map((page) => document.getElementById(page.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const nextIndex = docPages.findIndex((page) => page.id === visible.target.id);

        if (nextIndex !== -1) {
          setActiveTopic(nextIndex);
        }
      },
      {
        rootMargin: "-18% 0px -56% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col border-x border-white/10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/75 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-4">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="text-white">Docs</a>
              <a href="/enterprise" className="transition hover:text-white">Enterprise</a>
              <DownloadModalButton />
            </div>
          </div>
        </nav>

        <section className="grid md:grid-cols-[260px_1fr]">
          <aside className="border-b border-white/10 px-8 py-8 md:border-b-0 md:border-r">
            <div className="sticky top-24">
              <div className="relative flex max-h-[calc(100vh-160px)] flex-col gap-1 overflow-y-auto pr-2">
                <span
                  className="pointer-events-none absolute left-0 right-2 h-9 rounded-md bg-white/[0.055] transition-transform duration-300 ease-out"
                  style={{ transform: `translateY(${markerIndex * 40}px)` }}
                />
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    onMouseEnter={() => setHoveredTopic(index)}
                    onMouseLeave={() => setHoveredTopic(null)}
                    onFocus={() => setHoveredTopic(index)}
                    onBlur={() => setHoveredTopic(null)}
                    className={`relative z-10 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                      index === markerIndex ? "text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <section className="grid border-b border-white/10 md:grid-cols-2">
              {snippets.map(([label, command]) => (
                <div key={label} className="border-b border-white/10 px-8 py-7 md:border-r md:[&:nth-child(even)]:border-r-0">
                  <p className="text-xs font-bold text-white/35">{label}</p>
                  <code className="mt-3 block rounded-md border border-white/10 bg-black px-3 py-2 font-mono text-sm font-bold text-white/75">
                    {command}
                  </code>
                </div>
              ))}
            </section>

            {docPages.map((page) => (
              <article key={page.id} id={page.id} className="scroll-mt-24 border-b border-white/10 px-8 py-12">
                <h2 className="text-3xl font-bold">{page.title}</h2>
                <p className="mt-5 max-w-[680px] text-base leading-8 text-white/52">{page.body}</p>
                <div className="mt-7 max-w-[680px] rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold leading-6 text-white/58">
                  {page.callout}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-8 py-8 text-xs text-white/35">
          <span>© 2026 Nap</span>
          <div className="flex flex-wrap gap-5">
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/enterprise" className="transition hover:text-white">Enterprise</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
