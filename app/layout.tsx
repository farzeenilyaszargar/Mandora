import type { Metadata } from "next";
import { Fustat, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";

export const fustat = Fustat({
  weight: "400",
  subsets: ["arabic", "latin"],
  variable: "--font-fustat",
});

export const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ma-shan-zheng",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nap-code.com"),
  title: {
    default: "Nap | The Interface For All Your Agents",
    template: "%s | Nap",
  },
  description:
    "Nap is one native app for Claude Code, Codex CLI, Cursor, OpenCode, Grok CLI, and the coding agents you already use.",
  keywords: [
    "Nap",
    "coding agents",
    "Claude Code",
    "Codex CLI",
    "Cursor",
    "OpenCode",
    "Grok CLI",
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
      "Run your coding agents from one fast native workspace for sessions, context, commands, and handoffs.",
    url: "/",
    siteName: "Nap",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nap | The Interface For All Your Agents",
    description:
      "One native app for Claude Code, Codex CLI, Cursor, OpenCode, Grok CLI, and the coding agents you already use.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fustat.variable} ${maShanZheng.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
