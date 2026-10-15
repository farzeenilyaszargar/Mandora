import type { Metadata } from "next";
import NapHeader from "../../components/nap-header";
import LiquidField from "../../components/liquid-field";
import "../../contrast.css";

export const metadata: Metadata = {
  title: "Why This?",
  description: "A small question behind the way we think about tools at Nap.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/blogs/why" },
};

export default function WhyPost() {
  return (
    <main className="contrast-page nap-article-page">
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">PLACEHOLDER POST · 2 MIN READ</span>
          <h1>Why This?</h1>
          <p>It is a useful question to keep close. Why does this need another window? Why is the next step difficult to find? Why does getting back to a project sometimes take longer than the change itself?</p>
          <p>None of these questions has a single answer. But asking them changes what you pay attention to. Instead of starting with what else a tool could do, you start with what someone is trying to get done.</p>
          <h2>More is not always the answer</h2>
          <p>Adding a feature is an obvious way to make a product feel more capable. Making an existing action easier to understand is less visible. So is removing a decision that did not need to be there in the first place.</p>
          <p>We think those smaller improvements deserve attention. A clear label, a familiar place to return to, or one less interruption can matter more than another panel of options. The work is in deciding what earns a place on the screen.</p>
          <h2>Keep the choice. Reduce the friction.</h2>
          <p>Different coding agents suit different tasks and different people. A shared workspace should respect that choice. The aim is not to make everyone work in exactly the same way, but to make the surrounding experience easier to navigate.</p>
          <p>That is the question we bring to Nap: can the tools stay flexible while the workspace feels simpler? We want your attention to follow the problem you are solving, rather than the arrangement of the tools around it.</p>
          <h2>A question worth repeating</h2>
          <p>There will always be another idea to try and another detail to adjust. Asking why gives those decisions a starting point. What does this help with? Who needs it? Could it be clearer?</p>
          <p>We do not expect the answers to stay fixed. We do want to keep asking. A little less friction begins with noticing where it comes from.</p>
          <p className="nap-placeholder-note">This is a placeholder draft. Final editorial content will replace it.</p>
        </article>
      </section>
      <LiquidField />
    </main>
  );
}
