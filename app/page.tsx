import type { Metadata } from "next";
import FractureOverlay from "./components/fracture-overlay";
import "./reveal.css";

export const metadata: Metadata = {
  title: { absolute: "Nap Download" },
  openGraph: { title: "Nap Download" },
  twitter: { title: "Nap Download" },
};

const download = "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

export default function Home() {
  return (
    <main className="nap-reveal">
      <div className="plain-page">
        <h1>nap.</h1>
        <p>good software doesn&apos;t need all that.</p>
        <p>
          All your coding agents. One interface. A native Mac app for Claude Code,
          Codex, Cursor, and OpenCode.
        </p>
        <ul>
          <li>Bring the subscriptions you already use.</li>
          <li>Keep your projects and conversations in one place.</li>
          <li>Spend less time switching and more time building.</li>
        </ul>
        <p><a href={download}>download for mac →</a></p>
        <p><small>No demo calls. No sales deck. Just the app.</small></p>
      </div>
      <FractureOverlay download={download} />
      <noscript><style>{".fracture-shell, .quick-download { display: none; }"}</style></noscript>
    </main>
  );
}
