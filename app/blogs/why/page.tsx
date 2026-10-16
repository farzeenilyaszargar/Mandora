import StructuredData from "../../components/structured-data";
import { pages, pageMetadata, articleSchema } from "../../lib/seo";
import NapProductImage from "../../components/nap-product-image";
import NapHeader from "../../components/nap-header";
import DeferredLiquidField from "../../components/deferred-liquid-field";
import "../../contrast.css";

export const metadata = pageMetadata(pages.why, true);

export default function WhyPost() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={articleSchema(pages.why)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">PRODUCT NOTES · 2 MIN READ</span>
          <h1>Why This?</h1>
          <p>A good coding session has a simple rhythm. You describe a goal, work through it with an agent, and review what changed. Nap puts that rhythm at the center of a native app.</p>
          <p>Your project, the conversation, and the work that follows all share the same space. You can stay with the problem from the first question to the next change.</p>

          <figure className="nap-article-image">
            <NapProductImage alt="Nap’s native desktop workspace, showing project sessions in a sidebar and an agent conversation beside them." sizes="(max-width: 1000px) 90vw, 920px" />
            <figcaption>A place for your projects, your conversations, and the next thing you want to make.</figcaption>
          </figure>

          <h2>Open a project. Start a conversation.</h2>
          <p>Bring a project into Nap, choose an agent, and describe what you want to build, fix, or understand. You work through the app’s interface. No separate CLI installation is required.</p>
          <p>A clear starting point helps: what should happen, what happens today, and which details matter. The conversation gives you room to refine that request as you learn more.</p>

          <h2>Choose the agent that fits.</h2>
          <p>Claude Code, Codex, Cursor, OpenCode, and Grok Bot each have a place in the way people build. Nap brings those choices into one native workspace.</p>
          <p>You can follow a familiar flow around your project and conversation while working with the agent you prefer. The interface gives that work a consistent shape.</p>

          <h2>See the work. Make the call.</h2>
          <p>An agent’s response is the beginning of a review. What did it do? Which files changed? Does the result match what you asked for? Nap keeps the conversation and agent activity together so you can follow the work.</p>
          <p>Read the result, inspect the code changes, and ask a follow-up question when something needs another pass. Your judgment stays part of the process.</p>

          <h2>Return with your context.</h2>
          <p>Projects rarely happen in one sitting. Keeping sessions organized gives you a place to return to, with the conversation that explains how you got there.</p>
          <p>That is why Nap takes this shape: a native app built around the whole coding session. Open your project, work with your agent, and keep moving.</p>
        </article>
      </section>
      <DeferredLiquidField />
    </main>
  );
}
