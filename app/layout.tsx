import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nap-code.com"),
  title: {
    default: "Nap | The Interface For All Your Agents",
    template: "%s | Nap",
  },
  description:
    "Nap is a native app for building with coding agents. Open projects, chat with agents, and review code changes without command-line setup.",
  keywords: [
    "Nap",
    "coding agents",
    "Claude Code",
    "Codex",
    "Cursor",
    "OpenCode",
    "Grok Bot",
    "developer tools",
    "AI coding",
  ],
  applicationName: "Nap",
  authors: [{ name: "Nap" }],
  creator: "Nap",
  publisher: "Nap",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nap | The Interface For All Your Agents",
    description:
      "Open a project, choose a coding agent, and build in one native app. Keep conversations and code changes together.",
    url: "/",
    siteName: "Nap",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nap | The Interface For All Your Agents",
    description:
      "Build with Claude Code, Codex, Cursor, OpenCode, and Grok Bot in one native app. No separate CLI installation required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
