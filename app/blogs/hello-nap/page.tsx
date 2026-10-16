import StructuredData from "../../components/structured-data";
import { pages, pageMetadata, articleSchema } from "../../lib/seo";
import NapHeader from "../../components/nap-header";
import DeferredLiquidField from "../../components/deferred-liquid-field";
import "../../contrast.css";

export const metadata = pageMetadata(pages.story, true);

export default function WhyWeStartedPost() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={articleSchema(pages.story)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">2 MIN READ</span>
          <h1>Why We Started</h1>
          <p>We started Nap to make building with coding agents feel straightforward. Open an app, choose a project, and tell an agent what you want to do. Read its response, look at the changes, and decide what happens next. That whole loop belongs in one place.</p>
          <p>A native interface gives that work a home: your projects, your conversations, and the changes taking shape around them.</p>

          <h2>Start with what you want to build.</h2>
          <p>A session might begin with a bug you can reproduce, a feature you have been thinking about, or a part of the code you want to understand. Nap gives you a place to bring that question to an agent and work through the answer.</p>
          <p>You can describe the goal in the conversation, follow the agent’s activity, and review the result. The experience stays inside the app.</p>

          <h2>Your agents. One familiar app.</h2>
          <p>You might prefer Claude Code for one task and Codex for another. Nap brings your coding agents into a shared interface, so choosing an agent is part of working on a project.</p>
          <p>The surrounding experience should stay familiar: find your project, open a conversation, and get going. Your choice of agent can change while the place you work stays consistent.</p>

          <h2>Keep the decisions close.</h2>
          <p>The useful part of a conversation often lives between the prompts. There is the approach you ruled out, the detail you clarified, and the explanation that helped you understand a change. Those things are part of the project too.</p>
          <p>Keeping sessions and conversations together makes it easier to return after a break. You can find your thread and continue with the reasoning still close at hand.</p>

          <h2>Make room for the work.</h2>
          <p>Our aim is a focused app that helps you move from an idea to a change you understand. You still decide what to ask for, what to keep, and where to go next.</p>
          <p>That is the idea behind Nap: your agents, all together, with more room for your own thinking.</p>
        </article>
      </section>
      <DeferredLiquidField />
    </main>
  );
}
