"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DownloadModalButton from "../components/download-modal";

const navItems = [
  "Overview",
  "Local architecture",
  "Development",
  "macOS build",
  "GitHub actions",
  "Platforms",
  "Providers",
  "Copy guidance",
];

const docPages = [
  {
    id: "overview",
    title: "Overview",
    body: "Nap is a Rust and GPUI desktop workspace for local coding agents. It brings agent sessions, transcripts, tool activity, worktrees, and checkpoints into one native interface.",
    callout: "Current app version: 0.0.4.",
    items: [
      "Native performance with Rust and GPUI",
      "Provider-neutral agent sessions",
      "Transcript and tool activity in one timeline",
      "Working tree and conversation checkpoints",
    ],
  },
  {
    id: "local-architecture",
    title: "Local architecture",
    body: "Nap is local by design. Projects, sessions, transcripts, and provider state live on the user's machine rather than in a hosted account.",
    callout: "The app currently has no telemetry service, no automatic updater, and no public release endpoint.",
    items: [
      "Product data: ~/.nap",
      "macOS app data: Application Support/Nap",
      "No hosted cloud sync",
      "No analytics pipeline configured",
    ],
  },
  {
    id: "development",
    title: "Development",
    body: "The app is developed from the local workspace using Bun for web/tooling tasks and Cargo for the Rust workspace. Protocol generation should run before development when interfaces change.",
    callout: "The macOS development bundle is target/debug/Nap.app.",
    code: ["bun install", "bun run protocol:generate", "cargo test --workspace", "bun run dev"],
  },
  {
    id: "macos-build",
    title: "macOS build",
    body: "macOS is the primary packaged platform. A local unsigned release bundle can be created from the release script and packaged into target/release/Nap.app.",
    callout: "Without Apple signing credentials, release bundles are ad-hoc signed. Notarized public distribution is not set up yet.",
    code: ["bun run release"],
    items: [
      "Development bundle identifier: app.nap.dev",
      "Release bundle identifier: app.nap",
      "Release script: scripts/release.ts",
      "Bundle script: scripts/bundle.sh release",
    ],
  },
  {
    id: "github-actions",
    title: "GitHub actions",
    body: "The repository includes macOS-only workflows for binaries and tests. The binary workflow is manually triggered and produces a macOS app zip plus a tarball of binaries.",
    callout: "Expected artifact name: nap-macos.",
    code: [
      'gh workflow run "macOS Binaries" --repo farzeenilyaszargar/NotNap --ref main',
      "gh run watch --repo farzeenilyaszargar/NotNap",
    ],
    items: [
      ".github/workflows/macos-binaries.yml",
      ".github/workflows/test.yml",
      "Nap-macos.app.zip",
      "nap-macos-binaries.tar.gz",
    ],
  },
  {
    id: "platforms",
    title: "Platforms",
    body: "macOS is the primary platform today. Linux and Windows packaging notes exist, but official public Linux binaries and Windows installers are not published yet.",
    callout: "Linux users build locally from the Rust workspace. Windows installer packaging can use resources/windows/nap.iss.",
    items: [
      "Linux desktop file: resources/linux/app.nap.desktop",
      "Windows installer script: resources/windows/nap.iss",
      "Publisher, support, website, and update URLs are not configured",
    ],
  },
  {
    id: "providers",
    title: "Providers",
    body: "Nap talks to coding-agent CLIs through long-lived driver sessions. Provider events are normalized into shared transcript activity types for commands, file changes, searches, plans, tool calls, reasoning, and text.",
    callout: "Provider implementation details live in docs/providers.md and crates/nap-core/src/driver/mod.rs.",
    items: [
      "Codex CLI",
      "Claude Code",
      "Cursor CLI",
      "OpenCode",
      "Amp",
      "Pi and Oh My Pi",
      "Grok Build",
      "Kimi Code",
      "DeepSeek Harness",
    ],
  },
  {
    id: "copy-guidance",
    title: "Copy guidance",
    body: "Website copy should present Nap as native, local, provider-neutral, and careful about release status. Avoid claiming hosted sync, telemetry, automatic updates, notarized releases, or official Linux and Windows binaries until those are actually configured.",
    callout: "Downloads should only be advertised when a build artifact or release exists.",
    items: [
      "Say: native, local, provider-neutral",
      "Say: release bundles are unsigned/ad-hoc unless signing is configured",
      "Do not say: hosted cloud service or remote account sync",
      "Do not say: automatic updates or public release endpoint",
    ],
  },
];

const snippets = [
  ["Install dependencies", "bun install"],
  ["Generate protocols", "bun run protocol:generate"],
  ["Run tests", "cargo test --workspace"],
  ["Start development", "bun run dev"],
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
        <nav className="fixed left-1/2 top-0 z-50 w-[calc(100%-2rem)] max-w-[1120px] -translate-x-1/2 border-x border-b border-white/10 bg-[#050505]/75 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-3">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="text-white">Docs</a>
              <DownloadModalButton />
            </div>
          </div>
        </nav>

        <section className="grid pt-14 md:grid-cols-[260px_1fr]">
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
                {page.code ? (
                  <div className="mt-7 max-w-[680px] overflow-hidden rounded-xl border border-white/10 bg-black">
                    {page.code.map((line) => (
                      <code key={line} className="block border-b border-white/10 px-5 py-3 font-mono text-sm font-bold text-white/62 last:border-b-0">
                        {line}
                      </code>
                    ))}
                  </div>
                ) : null}
                {page.items ? (
                  <div className="mt-7 flex max-w-[680px] flex-wrap gap-2">
                    {page.items.map((item) => (
                      <span key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/55">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
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
          </div>
        </footer>
      </div>
    </main>
  );
}
