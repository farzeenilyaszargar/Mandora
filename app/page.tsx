import type { Metadata } from "next";
import Image from "next/image";
import "./reveal.css";

export const metadata: Metadata = {
  title: { absolute: "Nap Download" },
  openGraph: { title: "Nap Download" },
  twitter: { title: "Nap Download" },
};

const macDownloadUrl =
  "https://github.com/farzeenilyaszargar/NotNap/releases/latest/download/NotNap-macos.dmg";

export default function Home() {
  return (
    <main className="nap-reveal">
      <div className="plain-page">
        <h1>nap.</h1>
        <p>good software doesn&apos;t need all that.</p>
        <a href={macDownloadUrl}>download for mac →</a>
      </div>

      <a className="quick-download" href={macDownloadUrl}>download for mac →</a>

      <div className="saas-scene" aria-hidden="true">
        <div className="saas-announcement falling-piece">BREAKING: WE HAVE ADDED AI TO THE AI. <span>Meet Nap Enterprise Ultra ↗</span></div>
        <div className="saas-nav falling-piece">
          <span className="saas-brand"><Image src="/logo.png" alt="" width={26} height={26} priority /> nap<span>®</span></span>
          <div className="saas-nav-links"><span>Platform ⌄</span><span>Solutions ⌄</span><span>Resources ⌄</span><span>Why us? ⌄</span></div>
        </div>

        <div className="saas-content">
          <div className="saas-hero">
            <div className="saas-pitch falling-piece">
              <div className="saas-badge">● THE #1 AGENT ENABLEMENT PLATFORM*</div>
              <h2>The future of<br />shipping the <em>future.</em></h2>
              <p>Unlock a new paradigm of agentic synergy. Supercharge your superpowers. Operationalize the possibilities.</p>
              <div className="saas-fake-actions"><span>Book a demo of the demo ↗</span><span>Watch the keynote ▷</span></div>
              <small>*According to our landing page.</small>
            </div>

            <div className="saas-product falling-piece">
              <div className="saas-product-top"><span>YOUR SINGLE SOURCE OF EVERYTHING</span><span>● ALL SYSTEMS SYNERGIZING</span></div>
              <Image src="/nap-app-hero.png" alt="" width={1380} height={872} priority unoptimized />
              <div className="saas-product-bottom"><span>SYNERGY SCORE <b>∞</b></span><span>PRODUCTIVITY <b>+400%</b></span><span>TABS REPLACED <b>All of them</b></span></div>
            </div>
          </div>

          <div className="saas-proof falling-piece"><span>TRUSTED BY PEOPLE WITH JOB TITLES</span><b>CEO of tabs</b><b>Stealth mode</b><b>Series Z</b><b>Your competitor</b></div>

          <div className="saas-features">
            {[
              ["01 / ORCHESTRATE", "One more dashboard.", "For managing your dashboard dashboards."],
              ["02 / ACCELERATE", "10x your 10x.", "That's at least two numbers."],
              ["03 / ENTERPRISE", "Enterprise everything.", "Even the loading spinner is SOC-ish."],
              ["04 / MONETIZE", "$49 per seat per seat.", "Billed emotionally. Contact sales."],
            ].map(([label, title, description]) => (
              <div className="saas-feature falling-piece" key={label}><small>{label}</small><h3>{title}</h3><p>{description}</p></div>
            ))}
          </div>
        </div>

        <div className="saas-toast falling-piece"><span>✦</span><div><b>You&apos;re leaving productivity on the table.</b><p>17 people are currently booking a discovery call.</p></div><span>×</span></div>
        <div className="saas-cookie falling-piece"><b>We respect your privacy. Allegedly.</b><p>We use 47 essential cookies to remember that you hate cookies.</p><span>Accept destiny</span><small>Manage 812 preferences</small></div>
        <div className="saas-chat falling-piece"><b>Sales has entered the chat.</b><p>Got 30 minutes for a quick 60-minute call?</p><span>Let&apos;s circle back ↗</span></div>
      </div>
    </main>
  );
}
