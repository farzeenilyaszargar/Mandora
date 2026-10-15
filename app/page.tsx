import type { Metadata } from "next";
import LiquidField from "./components/liquid-field";
import "./contrast.css";

export const metadata: Metadata = {
  title: { absolute: "Nap — Your agents. All together." },
  description: "One native workspace for the coding agents you already use. Download Nap for macOS.",
};

const download = "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

export default function Home() {
  return (
    <main className="contrast-page">
      <header className="nap-header">
        <a href="/" className="nap-wordmark" aria-label="Nap home">nap<span>®</span></a>
        <a className="nap-docs" href="https://github.com/farzeenilyaszargar/NotNap/releases">Changelog</a>
      </header>

      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <p className="nap-eyebrow">A LITTLE LESS FRICTION.</p>
          <h1 id="nap-title"><span>YOUR AGENTS.</span><span>ALL TOGETHER.</span></h1>
          <div className="nap-hero-bottom">
          <p className="nap-description">One native workspace for the coding agents you already use. Get into your flow.</p>
          <div className="nap-action">
            <a className="nap-download" href={download}>
              <span>Download for macOS</span>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c.02 3.22 2.83 4.3 2.86 4.31-.02.08-.45 1.54-1.48 3.05-.9 1.31-1.83 2.61-3.3 2.64-1.44.03-1.91-.85-3.57-.85-1.65 0-2.17.82-3.54.88-1.42.05-2.5-1.42-3.4-2.73-1.86-2.69-3.28-7.61-1.37-10.93.95-1.65 2.65-2.7 4.5-2.73 1.4-.03 2.73.94 3.58.94.86 0 2.47-1.16 4.16-.99.7.03 2.68.28 3.95 2.14-.1.06-2.36 1.37-2.39 4.27ZM14.34 4.35c.75-.91 1.26-2.17 1.12-3.43-1.08.04-2.39.72-3.16 1.62-.7.81-1.32 2.1-1.15 3.34 1.2.09 2.42-.61 3.19-1.53Z" /></svg>
            </a>
            <p className="nap-download-note">Your next good idea starts here.</p>
          </div>
          </div>
        </div>
      </section>

      <footer className="nap-footer-statement">LESS NOISE. MORE MAKING.</footer>
      <LiquidField />
    </main>
  );
}
