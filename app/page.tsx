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
      <p><em>We spent all our time on the app.</em></p>
      <p>All your coding agents. One interface.</p>
      <p>
        A macOS app for Claude Code, Codex CLI, OpenCode, Cursor, and Grok CLI.
        Bring the agents and subscriptions you already use.
      </p>
      <h2><a href={macDownloadUrl}>[ Download for macOS ]</a></h2>
      <p><small>Version 0.0.4-notnap.3. Yes, the app has a UI.</small></p>

      <hr />
      <p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nap-app-hero.png"
          alt="Nap running on macOS, with coding sessions in a sidebar and an agent conversation in the main workspace."
          width={900}
          height={569}
        />
      </p>
      <hr />

      <h2>Installation</h2>
      <ol>
        <li>Download the disk image.</li>
        <li>Open it and drag Nap into Applications.</li>
        <li>Open Nap and connect your coding agents.</li>
      </ol>
      <p>The website is done loading. You can get back to building.</p>

      <hr />
      <footer>
        <p>
          <a href="https://github.com/farzeenilyaszargar/NotNap">GitHub</a>
          {" | "}
          <a href="https://x.com/farzeenilya">X</a>
          {" | "}
          <a href="https://github.com/farzeenilyaszargar/NotNap/releases/latest">Release notes</a>
        </p>
        <p><small>Nap. Better software than website.</small></p>
      </footer>
    </main>
  );
}
