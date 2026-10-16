import { site, pages, pageMetadata } from "./lib/seo";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata(pages.home),
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: ["Nap", "Nap Code", "nap.cx", "AI coding app", "coding agent workspace", "AI coding workspace", "agentic coding", "Mac coding app", "Claude Code", "Codex", "Cursor", "OpenCode", "Grok Bot"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
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
