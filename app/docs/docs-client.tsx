"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import DownloadModalButton from "../components/download-modal";

const sidebarGroups = [
  {
    title: "Start",
    items: [
      { title: "Overview", id: "overview" },
      { title: "Installation", id: "installation" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { title: "Local architecture", id: "local-architecture" },
      { title: "Sessions", id: "sessions" },
      { title: "Checkpoints", id: "checkpoints" },
    ],
  },
  {
    title: "Develop",
    items: [
      { title: "Development setup", id: "development-setup" },
      { title: "macOS build", id: "macos-build" },
      { title: "GitHub actions", id: "github-actions" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Providers", id: "providers" },
      { title: "Platforms", id: "platforms" },
      { title: "Copy guidance", id: "copy-guidance" },
    ],
  },
];

const docPages = [
  {
    id: "overview",
    title: "Overview",
    summary:
      "Nap is a Rust and GPUI desktop workspace for local coding agents. It brings sessions, transcripts, tool activity, worktrees, and checkpoints into one native interface.",
    topics: [
      {
        title: "What Nap does",
        body:
          "Nap gives every supported agent a shared place to run, review work, follow tool activity, and keep the project thread intact. It is meant to replace scattered terminal tabs with one native workspace where the conversation and the code changes stay connected.",
        items: ["Run agent CLIs", "Track transcripts", "Review tool activity", "Keep project context together"],
      },
      {
        title: "What it is built for",
        body:
          "The product is optimized for native performance, provider-neutral workflows, checkpointed project work, and keyboard-first operation. The goal is a focused control layer for people who already work with several agent tools and need a calmer way to manage them.",
        items: ["Native Rust + GPUI surface", "Provider-neutral sessions", "Checkpoint-aware project work"],
      },
      {
        title: "Current version",
        body:
          "The current app reference version is 0.0.4. Public-facing copy should treat this as an early release and avoid promising release infrastructure that is not configured yet.",
      },
      {
        title: "Mental model",
        body:
          "Think of Nap as the desk around your agents. The agents still do their own work through their first-party CLIs, while Nap organizes the sessions, output, state, and handoffs into one interface.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    summary:
      "Nap is currently documented around local development and macOS app builds. Public release distribution should only be described when a real release artifact exists.",
    topics: [
      {
        title: "Install dependencies",
        body:
          "Install JavaScript tooling first, then generate protocol bindings before starting the app when interfaces have changed.",
        code: ["bun install", "bun run protocol:generate"],
      },
      {
        title: "Run locally",
        body:
          "Use the development script to launch the local app workflow. During development the macOS bundle is created under target/debug/Nap.app.",
        code: ["bun run dev"],
      },
      {
        title: "Verify the workspace",
        body:
          "Run the Rust test suite before cutting builds or changing provider behavior.",
        code: ["cargo test --workspace"],
      },
      {
        title: "Before a release",
        body:
          "Confirm protocol generation, workspace tests, and the local development launch path before preparing release artifacts. The docs should not imply a public stable installer unless the artifact exists.",
        items: ["Generated protocol code is current", "Rust tests pass", "Development app launches", "Release artifact is available"],
      },
    ],
  },
  {
    id: "local-architecture",
    title: "Local architecture",
    summary:
      "Nap is local by design. Projects, sessions, transcripts, and provider state live on the user's machine rather than in a hosted account.",
    topics: [
      {
        title: "Where data lives",
        body:
          "Product data is stored under ~/.nap. macOS app data lives in Application Support/Nap. This keeps sessions and provider state close to the machine where the project is being edited.",
        items: ["~/.nap", "Application Support/Nap"],
      },
      {
        title: "No hosted sync",
        body:
          "The reference docs do not describe hosted cloud sync, telemetry, an analytics pipeline, or a public automatic update endpoint.",
        items: ["No hosted account sync", "No telemetry service", "No analytics pipeline", "No public updater endpoint"],
      },
      {
        title: "Why it matters",
        body:
          "Local architecture keeps project context, provider IDs, transcripts, and working state close to the machine doing the work.",
      },
      {
        title: "Operational boundaries",
        body:
          "When describing Nap, be precise: local-first does not mean every provider is offline. Agent CLIs may still call their own upstream services depending on the provider and user configuration.",
      },
    ],
  },
  {
    id: "sessions",
    title: "Sessions",
    summary:
      "Sessions are the running workspace for each provider. They keep prompts, responses, normalized events, tool calls, and file activity together.",
    topics: [
      {
        title: "One timeline",
        body:
          "Provider events are normalized so commands, file changes, searches, plans, reasoning, and text can live in a shared transcript model. This gives different CLIs a consistent shape without hiding their original behavior.",
        items: ["Commands", "File changes", "Searches", "Plans", "Tool calls", "Reasoning", "Text"],
      },
      {
        title: "Long-lived drivers",
        body:
          "Nap talks to coding-agent CLIs through long-lived driver sessions rather than treating each prompt as a disconnected command.",
      },
      {
        title: "Project context",
        body:
          "Sessions are meant to preserve the useful working context around a project instead of scattering it across terminals.",
      },
      {
        title: "What to inspect",
        body:
          "A good session view should make it obvious what the agent did, which files changed, what tools ran, and where the user can safely continue or switch providers.",
      },
    ],
  },
  {
    id: "checkpoints",
    title: "Checkpoints",
    summary:
      "Checkpoints help connect working tree changes to the conversation that produced them, making it easier to rewind or inspect agent work.",
    topics: [
      {
        title: "Working tree state",
        body:
          "Nap tracks project work around the same session view that contains the transcript and provider activity. The user should be able to understand code movement and conversation context together.",
      },
      {
        title: "Rollback context",
        body:
          "The product direction is to rewind the work and the conversation together, rather than only preserving chat text.",
      },
      {
        title: "Agent accountability",
        body:
          "Tool activity and file changes stay visible beside the agent's reasoning and output.",
      },
      {
        title: "Review workflow",
        body:
          "Before accepting agent work, review the transcript, tool activity, and changed files as one story. Checkpoints should make that review less fragile.",
      },
    ],
  },
  {
    id: "development-setup",
    title: "Development setup",
    summary:
      "The app is developed from the local workspace using Bun for web and tooling tasks, and Cargo for the Rust workspace.",
    topics: [
      {
        title: "Install and generate",
        body:
          "Set up packages and generated protocol code before running the development bundle. Regenerate protocol bindings whenever shared interfaces or provider event contracts change.",
        code: ["bun install", "bun run protocol:generate"],
      },
      {
        title: "Run tests",
        body:
          "Use the workspace test command for Rust verification. This is the baseline check before changing provider drivers, session state, checkpoint behavior, or release scripts.",
        code: ["cargo test --workspace"],
      },
      {
        title: "Start development",
        body: "The macOS development bundle is target/debug/Nap.app.",
        code: ["bun run dev"],
      },
      {
        title: "Developer rhythm",
        body:
          "For provider-facing work, make small changes, regenerate where needed, run the workspace tests, then launch the app and inspect the transcript behavior manually.",
      },
    ],
  },
  {
    id: "macos-build",
    title: "macOS build",
    summary:
      "macOS is the primary packaged platform. A local release bundle can be created with the release script and packaged into target/release/Nap.app.",
    topics: [
      {
        title: "Create a release bundle",
        body:
          "Run the release script from the app workspace. The output path described by the reference docs is target/release/Nap.app.",
        code: ["bun run release"],
      },
      {
        title: "Bundle identifiers",
        body:
          "The development bundle identifier is app.nap.dev. The release bundle identifier is app.nap.",
        items: ["Development: app.nap.dev", "Release: app.nap"],
      },
      {
        title: "Signing status",
        body:
          "Without Apple signing credentials, release bundles are ad-hoc signed. Notarized public distribution is not set up yet.",
      },
      {
        title: "Distribution wording",
        body:
          "Use careful language for macOS builds. If the build is ad-hoc signed, do not describe it as notarized or App Store ready.",
      },
    ],
  },
  {
    id: "github-actions",
    title: "GitHub actions",
    summary:
      "The repository includes macOS-only workflows for binaries and tests. The binary workflow is manually triggered and produces downloadable artifacts.",
    topics: [
      {
        title: "Run the binary workflow",
        body: "Trigger the macOS binary workflow manually when a build artifact is needed.",
        code: [
          'gh workflow run "macOS Binaries" --repo farzeenilyaszargar/NotNap --ref main',
          "gh run watch --repo farzeenilyaszargar/NotNap",
        ],
      },
      {
        title: "Artifacts",
        body:
          "Expected artifacts include nap-macos, Nap-macos.app.zip, and nap-macos-binaries.tar.gz. These should be checked before linking a website download to a release.",
        items: ["nap-macos", "Nap-macos.app.zip", "nap-macos-binaries.tar.gz"],
      },
      {
        title: "Workflow files",
        body: "The relevant references are .github/workflows/macos-binaries.yml and .github/workflows/test.yml.",
      },
      {
        title: "When to use Actions",
        body:
          "Use the GitHub workflow for repeatable macOS artifacts. Use local release builds when testing packaging changes before publishing.",
      },
    ],
  },
  {
    id: "providers",
    title: "Providers",
    summary:
      "Nap talks to coding-agent CLIs through provider drivers and presents their activity through shared transcript types.",
    topics: [
      {
        title: "Supported agents",
        body:
          "Reference providers include Codex CLI, Claude Code, Cursor CLI, OpenCode, Amp, Pi and Oh My Pi, Grok Build, Kimi Code, and DeepSeek Harness.",
        items: ["Codex CLI", "Claude Code", "Cursor CLI", "OpenCode", "Amp", "Grok Build", "Kimi Code", "DeepSeek Harness"],
      },
      {
        title: "Driver reference",
        body:
          "Provider implementation details live in docs/providers.md and crates/nap-core/src/driver/mod.rs.",
      },
      {
        title: "Shared events",
        body:
          "Provider output is normalized into events for commands, file changes, searches, plans, tool calls, reasoning, and text.",
      },
      {
        title: "Bring your own keys",
        body:
          "Nap should be described as running first-party CLIs under the hood. Users keep using each provider's own authentication flow, subscriptions, and local CLI setup.",
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms",
    summary:
      "macOS is the primary platform today. Linux and Windows packaging notes exist, but official public Linux binaries and Windows installers are not published yet.",
    topics: [
      {
        title: "macOS",
        body:
          "macOS is the primary packaged platform and the only platform described as release-ready in the reference material. The website can point macOS users to the latest release artifact when available.",
      },
      {
        title: "Linux",
        body:
          "Linux users build locally from the Rust workspace. A desktop file exists at resources/linux/app.nap.desktop, but no official public Linux binaries are documented yet.",
      },
      {
        title: "Windows",
        body:
          "Windows installer packaging can use resources/windows/nap.iss, but published installers are not documented yet. Windows users should be routed to the waitlist until a release exists.",
      },
      {
        title: "Public promises",
        body:
          "Keep platform language aligned with real artifacts. A waitlist is better than a broken installer link.",
      },
    ],
  },
  {
    id: "copy-guidance",
    title: "Copy guidance",
    summary:
      "Website copy should present Nap as native, local, provider-neutral, and careful about release status.",
    topics: [
      {
        title: "Use these claims",
        body:
          "Use native, local, provider-neutral, transcript-aware, checkpointed, and keyboard-first language.",
        items: ["Native", "Local", "Provider-neutral", "Transcript-aware", "Checkpointed", "Keyboard-first"],
      },
      {
        title: "Avoid these claims",
        body:
          "Do not claim hosted cloud sync, telemetry, automatic updates, notarized releases, or official Linux and Windows binaries until those are configured.",
        items: ["Hosted sync", "Telemetry", "Automatic updates", "Notarized releases", "Official Linux/Windows installers"],
      },
      {
        title: "Download copy",
        body: "Downloads should only be advertised when a build artifact or release exists.",
      },
      {
        title: "Tone",
        body:
          "The best copy for Nap is confident but restrained: explain the interface clearly, preserve the local-first promise, and avoid pretending the release pipeline is further along than it is.",
      },
    ],
  },
];

function topicId(pageId: string, title: string) {
  return `${pageId}-${title.toLowerCase().replaceAll(" ", "-")}`;
}

export default function DocsClient() {
  const [activePageId, setActivePageId] = useState(docPages[0].id);
  const activePage = docPages.find((page) => page.id === activePageId) ?? docPages[0];
  const [activeMiniTopicId, setActiveMiniTopicId] = useState(topicId(activePage.id, activePage.topics[0].title));

  useEffect(() => {
    const syncPageFromHash = () => {
      const nextId = window.location.hash.replace("#", "");
      const nextPage = docPages.find((page) => page.id === nextId);

      if (nextPage) {
        setActivePageId(nextPage.id);
      }
    };

    syncPageFromHash();
    window.addEventListener("hashchange", syncPageFromHash);

    return () => window.removeEventListener("hashchange", syncPageFromHash);
  }, []);

  useEffect(() => {
    const firstTopicId = topicId(activePage.id, activePage.topics[0].title);
    setActiveMiniTopicId(firstTopicId);

    const sections = activePage.topics
      .map((topic) => document.getElementById(topicId(activePage.id, topic.title)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        setActiveMiniTopicId(visible.target.id);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activePage]);

  function openPage(event: MouseEvent<HTMLAnchorElement>, pageId: string) {
    event.preventDefault();
    setActivePageId(pageId);
    window.history.pushState(null, "", `#${pageId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col border-x border-white/10">
        <nav className="border-b border-white/10">
          <div className="flex items-center justify-between px-8 py-3">
            <a href="/" aria-label="Nap home">
              <Image className="brightness-0 invert" src="/logo.png" alt="" width={28} height={28} priority />
            </a>
            <div className="flex items-center gap-6 text-sm font-medium text-white/65">
              <a href="/docs" className="text-white">
                Docs
              </a>
              <DownloadModalButton />
            </div>
          </div>
        </nav>

        <section className="grid md:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_220px]">
          <aside className="border-b border-white/10 px-8 py-8 md:border-b-0 md:border-r">
            <div className="sticky top-24">
              <nav className="flex max-h-[calc(100vh-150px)] flex-col gap-7 overflow-y-auto pr-2" aria-label="Docs pages">
                {sidebarGroups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/26">
                      {group.title}
                    </p>
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const isActive = activePage.id === item.id;

                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(event) => openPage(event, item.id)}
                            className={`rounded-md px-3 py-2 text-sm font-semibold transition duration-200 ${
                              isActive ? "bg-white/[0.055] text-white" : "text-white/45 hover:bg-white/[0.03] hover:text-white"
                            }`}
                            aria-current={isActive ? "location" : undefined}
                          >
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <article key={activePage.id} id={activePage.id} className="border-b border-white/10 px-8 py-14">
                <div className="max-w-[720px]">
                  <h2 className="text-3xl font-bold">{activePage.title}</h2>
                  <p className="mt-4 text-base font-medium leading-8 text-white/52">{activePage.summary}</p>
                </div>
                <div className="mt-9 grid gap-5">
                  {activePage.topics.map((topic) => (
                    <section
                      key={topic.title}
                      id={topicId(activePage.id, topic.title)}
                      className="scroll-mt-24 rounded-xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <h3 className="text-base font-bold text-white">{topic.title}</h3>
                      <p className="mt-3 max-w-[680px] text-sm font-medium leading-7 text-white/48">{topic.body}</p>
                      {"code" in topic && topic.code ? (
                        <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-black">
                          {topic.code.map((line) => (
                            <code
                              key={line}
                              className="block border-b border-white/10 px-4 py-3 font-mono text-xs font-bold text-white/62 last:border-b-0"
                            >
                              {line}
                            </code>
                          ))}
                        </div>
                      ) : null}
                      {"items" in topic && topic.items ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {topic.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-white/52"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              </article>
          </div>

          <aside className="hidden border-l border-white/10 px-6 py-8 xl:block">
            <div className="sticky top-24">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/26">On this page</p>
              <div className="relative flex flex-col gap-2 pl-4">
                <span className="absolute bottom-0 left-0 top-0 w-px rounded-full bg-white/10" />
                {activePage.topics.map((topic) => (
                  <a
                    key={topic.title}
                    href={`#${topicId(activePage.id, topic.title)}`}
                    className="group relative rounded-md py-2 pl-4 text-xs font-semibold leading-5 text-white/42 transition hover:text-white"
                  >
                    <span
                      className={`absolute -left-4 top-2 h-[calc(100%-16px)] w-px rounded-full transition ${
                        activeMiniTopicId === topicId(activePage.id, topic.title)
                          ? "bg-white shadow-[0_0_16px_rgba(255,255,255,0.9),0_0_32px_rgba(255,255,255,0.3)]"
                          : "bg-transparent group-hover:bg-white/35"
                      }`}
                    />
                    {topic.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-8 py-8 text-xs text-white/35">
          <span>© 2026 Nap</span>
          <div className="flex flex-wrap gap-5">
            <a href="/" className="transition hover:text-white">
              Home
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
