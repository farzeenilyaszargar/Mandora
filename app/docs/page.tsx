import type { Metadata } from "next";
import DocsClient from "./docs-client";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Read the Nap docs for projects, providers, sessions, shortcuts, preferences, and local-first coding agent workflows.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Nap Docs",
    description:
      "A practical guide to running Claude Code, Codex CLI, Cursor, OpenCode, and Grok CLI in Nap.",
    url: "/docs",
  },
  twitter: {
    title: "Nap Docs",
    description:
      "A practical guide to projects, providers, sessions, and shortcuts in Nap.",
  },
};

export default function DocsPage() {
  return <DocsClient />;
}
