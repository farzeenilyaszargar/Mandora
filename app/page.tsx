import NapDownload from "./components/nap-download";
import Image from "next/image";
import NapHeader from "./components/nap-header";
import type { Metadata } from "next";
import LiquidField from "./components/liquid-field";
import "./contrast.css";

export const metadata: Metadata = {
  title: { absolute: "Nap — Your agents. All together." },
  description: "One native workspace for the coding agents you already use. Download Nap for MacOS.",
};

export default function Home() {
  return (
    <main className="contrast-page nap-home-page">
      <NapHeader />

      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <p className="nap-eyebrow">A LITTLE LESS FRICTION.</p>
          <h1 id="nap-title"><span>YOUR AGENTS.</span><span>ALL TOGETHER.</span></h1>
          <div className="nap-hero-bottom">
          <p className="nap-description">One native workspace for the coding agents you already use. Get into your flow.</p>
          <div className="nap-action">
            <NapDownload />
            <p className="nap-download-note">Your next good idea starts here.</p>
          </div>
          </div>
        </div>
      </section>

      <figure className="nap-full-width-product">
        <Image src="/nap-app-hero.png" alt="Nap’s native workspace showing project sessions and an agent conversation." width={1380} height={872} sizes="(max-width: 700px) 90vw, 92vw" />
      </figure>
      <section className="nap-agents nap-section" aria-labelledby="agents-title">
        <p id="agents-title" className="nap-section-label">THE AGENTS YOU ALREADY USE. A SPACE THAT FEELS LIKE YOURS.</p>
        <ul>
          {[
            ["Claude Code", "/claude-code-agent-logo.png"],
            ["Codex CLI", "/codex-cli-agent-logo.png"],
            ["Cursor", "/cursor-agent-logo.png"],
            ["OpenCode", "/opencode-agent-logo.png"],
            ["Grok Bot", "/grok-cli-agent-logo.png"],
          ].map(([name, logo]) => (
            <li key={name}><Image src={logo} alt="" width={36} height={36} /><span>{name}</span></li>
          ))}
        </ul>
      </section>


      <section className="nap-workflow nap-section" aria-labelledby="workflow-title">
        <div className="nap-section-heading"><h2 id="workflow-title">Less setup.<br />More getting somewhere.</h2><p>A familiar place to start.<br />An easier place to return to.</p></div>
        <div className="nap-workflow-steps">
          <article><span className="nap-step-symbol" aria-hidden="true">＋</span><h3>Bring your project.</h3><p>Start with the code you are working on and the question you want to explore.</p></article>
          <article><span className="nap-step-symbol" aria-hidden="true">↗</span><h3>Choose your agent.</h3><p>Use the CLI that fits the task, with its own account and configuration.</p></article>
          <article><span className="nap-step-symbol" aria-hidden="true">↳</span><h3>Stay with the work.</h3><p>Follow the conversation, inspect the activity, and decide what comes next.</p></article>
        </div>
      </section>




      <section className="nap-closing" aria-labelledby="closing-title">
        <p className="nap-section-label">YOUR NEXT GOOD IDEA STARTS HERE.</p>
        <h2 id="closing-title">GET INTO<br />YOUR FLOW.</h2>
        <NapDownload />
      </section>
      <footer className="nap-site-footer nap-section">
        <div className="nap-footer-bottom"><span>© 2026 NAP</span><span>A LITTLE LESS FRICTION. A LOT MORE FLOW.</span></div>
      </footer>
      <LiquidField />
    </main>
  );
}
