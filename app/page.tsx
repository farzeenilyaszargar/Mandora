import type { Metadata } from "next";
import LiquidField from "./components/liquid-field";
import "./contrast.css";

export const metadata: Metadata = {
  title: { absolute: "Nap — All your agents. One space." },
  description: "One native workspace for the coding agents you already use. Download Nap for Mac.",
};

const download = "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

function FlowStudy() {
  return (
    <span className="flow-study" aria-hidden="true">
      <svg viewBox="0 0 240 150" fill="none">
        <g className="flow-rings">
          {Array.from({ length: 28 }, (_, i) => (
            <ellipse key={i} cx="120" cy="75" rx="69" ry="31" transform={`rotate(${i * 6.43} 120 75)`} stroke={`rgb(${90 + i * 5}, ${90 + i * 5}, ${90 + i * 5})`} strokeWidth=".8" />
          ))}
        </g>
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <main className="contrast-page">
      <header className="contrast-header">
        <a href="/" className="contrast-brand" aria-label="Nap home">nap<span>®</span></a>
        <span className="contrast-nav-label"><i /> A NATIVE SPACE FOR YOUR AGENTS</span>
        <a className="contrast-nav-link" href="/docs"><i /> DOCUMENTATION <span>↗</span></a>
        <a className="contrast-nav-link" href={download}><i /> DOWNLOAD NAP <span>↗</span></a>
      </header>

      <section className="contrast-hero" aria-labelledby="nap-title">
        <p className="contrast-description">One native workspace for Claude Code, Codex, Cursor, and the coding agents you already use. Less noise. More making.</p>
        <h1 id="nap-title">
          <span className="headline-row">YOUR AGENTS.</span>
          <span className="headline-row headline-indent">ONE SPACE.</span>
          <span className="headline-row headline-indent headline-last"><span>JUST</span><FlowStudy /><span>NAP.</span></span>
        </h1>
        <a className="contrast-download" href={download}><span>↓</span> Download for Mac <span>↗</span></a>
      </section>

      <div className="contrast-stripes" aria-hidden="true"><span /><span /><span /></div>
      <footer className="contrast-footer">
        <span>ALL YOUR AGENTS. ONE SPACE.</span>
        <span className="contrast-interact">MOVE YOUR CURSOR. MAKE YOUR MARK.</span>
        <a href="/waitlist">WINDOWS & LINUX <span>↗</span></a>
      </footer>
      <LiquidField />
    </main>
  );
}
