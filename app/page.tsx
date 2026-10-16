import WorkflowIcon from "./components/workflow-icon";
import NapProductImage from "./components/nap-product-image";
import NapDownload from "./components/nap-download";
import Image from "next/image";
import NapHeader from "./components/nap-header";
import type { Metadata } from "next";
import DeferredLiquidField from "./components/deferred-liquid-field";
import "./contrast.css";

export const metadata: Metadata = {
  title: { absolute: "Nap — Your agents. All together." },
  description: "Build with coding agents in one native app. Open a project, choose an agent, and review the changes in Nap. No command-line setup required.",
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
          <p className="nap-description">Build with coding agents in one native app. Open a project, describe what you want, and review the changes.</p>
          <div className="nap-action">
            <NapDownload />
            <p className="nap-download-note">Your next good idea starts here.</p>
          </div>
          </div>
        </div>
      </section>

      <figure className="nap-full-width-product">
        <NapProductImage eager alt="Nap’s native workspace showing project sessions and an agent conversation." sizes="(max-width: 700px) 90vw, 92vw" />
      </figure>
      <section className="nap-agents nap-section" aria-labelledby="agents-title">
        <p id="agents-title" className="nap-section-label">WORK WITH YOUR CODING AGENTS, RIGHT INSIDE NAP.</p>
        <ul>
          {[
            ["Claude Code", "/claude-code-logo-5a6c64a5.webp"],
            ["Codex", "/codex-logo-3366e2d2.webp"],
            ["Cursor", "/cursor-logo-8bc30dd7.webp"],
            ["OpenCode", "/opencode-logo-16e2d629.webp"],
            ["Grok Bot", "/grok-bot-logo-fa760b00.webp"],
          ].map(([name, logo]) => (
            <li key={name} data-agent={name}><Image src={logo} alt="" width={36} height={36} unoptimized className={name === "OpenCode" || name === "Grok Bot" ? "nap-agent-logo-small" : name === "Codex" || name === "Claude Code" ? "nap-agent-logo-original" : undefined} /><span>{name}</span></li>
          ))}
        </ul>
      </section>


      <section className="nap-workflow nap-section" aria-labelledby="workflow-title">
        <div className="nap-section-heading"><h2 id="workflow-title">Less setup.<br />More getting somewhere.</h2><p>Open a project. Choose an agent.<br />Start building, right inside Nap.</p></div>
        <div className="nap-workflow-steps">
          <article><WorkflowIcon kind="project" /><h3>Open your project.</h3><p>Bring your code into Nap and start a conversation about what you want to build or change.</p></article>
          <article><WorkflowIcon kind="agent" /><h3>Choose your agent.</h3><p>Pick the agent you want to work with directly in Nap. No separate CLI installation required.</p></article>
          <article><WorkflowIcon kind="work" /><h3>Review and keep going.</h3><p>See what your agent did, review the code changes, and continue the conversation in the same app.</p></article>
        </div>
      </section>




      <section className="nap-closing" aria-labelledby="closing-title">
        <p className="nap-section-label">YOUR NEXT GOOD IDEA STARTS HERE.</p>
        <h2 id="closing-title">GET INTO<br />YOUR FLOW.</h2>
        <NapDownload />
      </section>
      <footer className="nap-site-footer nap-section">
        <div className="nap-footer-bottom"><span>© 2026 NAP</span><a href="https://x.com/napverse" target="_blank" rel="noopener noreferrer">TWITTER @napverse ↗</a><span>A LITTLE LESS FRICTION. A LOT MORE FLOW.</span></div>
      </footer>
      <DeferredLiquidField />
    </main>
  );
}
