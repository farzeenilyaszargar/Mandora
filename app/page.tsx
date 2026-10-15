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
        <a href={download}>download for mac →</a>
      </div>
      <FractureOverlay download={download} />
      <noscript><style>{".fracture-shell, .quick-download { display: none; }"}</style></noscript>
    </main>
  );
}
