import NapHeader from "../../components/nap-header";
import type { Metadata } from "next";
import LiquidField from "../../components/liquid-field";
import "../../contrast.css";

export const metadata: Metadata = {
  title: "Why We Started",
  description: "Why Nap brings your coding agents into one native workspace, with less switching and more room to think.",
  alternates: { canonical: "/blogs/hello-nap" },
};

export default function WhyWeStartedPost() {
  return (
    <main className="contrast-page nap-article-page">
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">2 MIN READ</span>
          <h1>Why We Started</h1>
          <p>Good tools give you room to think. They help you stay with an idea long enough to turn it into something real. That is the idea behind Nap: one native workspace for the coding agents you already use, with a little less getting in the way.</p>

          <h2>The work between the work</h2>
          <p>A coding session is rarely just writing code. There is a question to explore, a change to review, an approach to rethink, and a thread to pick up after a break. When all of that is scattered across windows, finding your place becomes a task of its own.</p>
          <p>Each switch can be small. Together, those switches make it harder to keep the shape of a problem in your head. We think the space around your agents deserves as much attention as the agents themselves.</p>

          <h2>Your agents. One familiar place.</h2>
          <p>You might reach for Claude Code on one project, Codex on another, or keep Cursor and OpenCode in your workflow. Your choice of agent should follow the work. Nap brings those tools into a shared native interface, giving the surrounding experience a familiar home.</p>
          <p>The goal is simple: open your workspace, find the conversation you need, and get back to making. Less time arranging the tools. More attention for what you are trying to build.</p>

          <h2>Room to find your flow</h2>
          <p>Flow looks different for everyone. Sometimes it means moving quickly through a small fix. Sometimes it means slowing down, asking better questions, and trying a few directions before one feels right.</p>
          <p>We want Nap to make room for both. A focused workspace should feel useful when you need it and quiet when you do not. The measure is how easily you can return to your own train of thought.</p>

          <h2>More to come</h2>
          <p>This blog will be a place for product updates, design decisions, and notes about working with coding agents. We will share the thinking behind the details as Nap takes shape.</p>
          <p>For now, the idea is the same as the name on the homepage: your agents, all together. A little less friction. A little more room to make something.</p>
        </article>
      </section>
      <LiquidField />
    </main>
  );
}
