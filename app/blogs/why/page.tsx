import type { Metadata } from "next";
import Image from "next/image";
import NapHeader from "../../components/nap-header";
import LiquidField from "../../components/liquid-field";
import "../../contrast.css";

export const metadata: Metadata = {
  title: "Why This?",
  description: "Your choice of coding agent can change. Your workspace should still feel like yours. The thinking behind Nap.",
  alternates: { canonical: "/blogs/why" },
};

export default function WhyPost() {
  return (
    <main className="contrast-page nap-article-page">
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">PRODUCT NOTES · 2 MIN READ</span>
          <h1>Why This?</h1>
          <p>You open a project with a clear idea of what you want to build. A few minutes later, you are looking for the right session, reopening a conversation, and remembering which window belongs to which task. The idea is still there. You just have to find your way back to it.</p>
          <p>That small distance between wanting to work and actually working is what interests us. It is the reason for Nap.</p>

          <figure className="nap-article-image">
            <Image src="/nap-ui-240fdfdf.webp" alt="Nap’s native desktop workspace, showing project sessions in a sidebar and an agent conversation beside them." width={1380} height={872} priority sizes="(max-width: 1000px) 92vw, 920px" />
            <figcaption>A place for your projects, your conversations, and the next thing you want to make.</figcaption>
          </figure>

          <h2>The conversation is part of the work.</h2>
          <p>When you build with a coding agent, the conversation holds more than instructions. It holds the approach you decided against, the explanation that made something click, and the detail you will need when you return tomorrow. Keeping that thread close to the project matters.</p>
          <p>Nap brings sessions and conversations into one native workspace. The aim is to make finding your place feel ordinary: open the project, pick up the thread, keep going.</p>

          <h2>Choose the agent. Keep your space.</h2>
          <p>You may prefer Claude Code for one task and Codex for another. You might already work with Cursor, OpenCode, or Grok CLI. Those choices are personal, and they can change as the work changes.</p>
          <p>We want the surrounding workspace to feel familiar through those changes. A consistent place to work means fewer small decisions about where things live and more attention for what the agent is helping you do.</p>

          <h2>The details add up.</h2>
          <p>A readable conversation. A session you can find again. A composer with room for the next question. These are small pieces of an interface, but they are also the pieces you spend your day with.</p>
          <p>We care about how those moments fit together. Does the layout help you understand where you are? Is the next action clear? Can you step away and return without reconstructing the whole afternoon? Those questions guide the experience we want to build.</p>

          <h2>More room for your own thinking.</h2>
          <p>The work still needs your judgment: deciding what is worth building, noticing when something feels wrong, and knowing when a result is good enough to ship. Your tools should leave room for that.</p>
          <p>That is why this workspace exists. Your agents, all together. Your attention, back on the thing you came to make.</p>
        </article>
      </section>
      <LiquidField />
    </main>
  );
}
