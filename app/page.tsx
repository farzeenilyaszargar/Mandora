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
          {["Claude Code", "Codex CLI", "Cursor", "OpenCode", "Grok CLI"].map((agent) => <li key={agent}>{agent}</li>)}
        </ul>
      </section>

      <section className="nap-features nap-section" aria-labelledby="features-title">
        <div>
          <p className="nap-section-label">ROOM TO THINK.</p>
          <h2 id="features-title">The whole<br />thread.<br /><span>In one place.</span></h2>
        </div>
        <div className="nap-feature-list">
          <article><h3>A home for every project.</h3><p>Keep sessions connected to the project they belong to. Find the conversation you need and pick up where your thinking left off.</p></article>
          <article><h3>See what happened.</h3><p>Read responses, follow tool activity, and understand file changes in the same workspace. Keep the work and the conversation close.</p></article>
          <article><h3>Your choice of agent.</h3><p>Work with the coding agents you already know through a shared native interface. Let the task guide your choice of tool.</p></article>
        </div>
      </section>

      <section className="nap-workflow nap-section" aria-labelledby="workflow-title">
        <div className="nap-section-heading"><h2 id="workflow-title">Less setup.<br />More getting somewhere.</h2><p>A familiar place to start.<br />An easier place to return to.</p></div>
        <div className="nap-workflow-steps">
          <article><span className="nap-step-symbol" aria-hidden="true">＋</span><h3>Bring your project.</h3><p>Start with the code you are working on and the question you want to explore.</p></article>
          <article><span className="nap-step-symbol" aria-hidden="true">↗</span><h3>Choose your agent.</h3><p>Use the CLI that fits the task, with its own account and configuration.</p></article>
          <article><span className="nap-step-symbol" aria-hidden="true">↳</span><h3>Stay with the work.</h3><p>Follow the conversation, inspect the activity, and decide what comes next.</p></article>
        </div>
      </section>

      <section className="nap-local nap-section" aria-labelledby="local-title">
        <p className="nap-section-label">NATIVE BY DESIGN.</p>
        <h2 id="local-title">Your machine.<br />Your workspace.</h2>
        <div><p>Nap keeps projects, sessions, and transcripts on your machine. A native app built around the place your code already lives.</p><p>Your agents still connect to their own services. You keep using your existing provider accounts and CLI configuration.</p></div>
      </section>

      <section className="nap-faq nap-section" aria-labelledby="faq-title">
        <h2 id="faq-title">A few good<br />questions.</h2>
        <div className="nap-faq-list">
          <details><summary>What is Nap?<span aria-hidden="true">＋</span></summary><p>Nap is a native desktop workspace for coding agents. It brings projects, sessions, conversations, and tool activity into one interface.</p></details>
          <details><summary>Is Nap another coding agent?<span aria-hidden="true">＋</span></summary><p>Nap is the workspace around your agents. They continue to run through their own CLIs; Nap gives their sessions and output a shared home.</p></details>
          <details><summary>Do I need my own agent accounts?<span aria-hidden="true">＋</span></summary><p>Yes. Use your existing provider accounts and install and configure the agent CLI you want to work with. Downloading Nap does not include a provider subscription.</p></details>
          <details><summary>Does everything run offline?<span aria-hidden="true">＋</span></summary><p>Nap stores workspace data locally. The agents you use may send prompts and project context to their upstream services, depending on your provider and configuration.</p></details>
          <details><summary>Which platform can I download?<span aria-hidden="true">＋</span></summary><p>The download on this page is the MacOS build. See CHANGELOGS for release notes and available release assets.</p></details>
        </div>
      </section>

      <section className="nap-journal nap-section" aria-labelledby="journal-title">
        <div className="nap-section-heading"><h2 id="journal-title">Behind the build.</h2><a href="/blogs">ALL BLOGS ↗</a></div>
        <a className="nap-journal-link" href="/blogs/hello-nap"><span>Why We Started</span><span aria-hidden="true">↗</span></a>
        <a className="nap-journal-link" href="/blogs/why"><span>Why This?</span><span aria-hidden="true">↗</span></a>
      </section>

      <section className="nap-closing" aria-labelledby="closing-title">
        <p className="nap-section-label">YOUR NEXT GOOD IDEA STARTS HERE.</p>
        <h2 id="closing-title">GET INTO<br />YOUR FLOW.</h2>
        <NapDownload />
      </section>
      <footer className="nap-site-footer nap-section">
        <div className="nap-footer-top"><a href="/" className="nap-wordmark" aria-label="Nap home">nap<span>®</span></a><nav aria-label="Footer navigation"><a href="/blogs">BLOGS</a><a href="https://github.com/farzeenilyaszargar/NotNap/releases">CHANGELOGS</a></nav></div>
        <p>Nap brings the coding agents you already use into one native workspace. Less switching between windows, less searching for where you left off, and more room to focus on what you’re building. Your agents, your projects, your train of thought—all together, so you can get back to making.</p>
        <div className="nap-footer-bottom"><span>© 2026 NAP</span><span>A LITTLE LESS FRICTION. A LOT MORE FLOW.</span></div>
      </footer>
      <LiquidField />
    </main>
  );
}
