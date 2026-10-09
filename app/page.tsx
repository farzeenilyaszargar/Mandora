import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Nap Download" },
  openGraph: { title: "Nap Download" },
  twitter: { title: "Nap Download" },
};

const macDownloadUrl =
  "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

export default function Home() {
  return (
    <main className="barebones">
      <h1>nap.</h1>
      <p>All your coding agents. One interface.</p>
      <p>
        A macOS app for Claude Code, Codex CLI, OpenCode, Cursor, and Grok CLI.
        Bring the agents and subscriptions you already use.
      </p>
      <h2><a href={macDownloadUrl}>[ Download for macOS ]</a></h2>
      <hr />
      <p><em>We spent all our time on the app.</em></p>
    </main>
  );
}
