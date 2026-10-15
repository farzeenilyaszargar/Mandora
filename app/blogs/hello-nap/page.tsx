import NapHeader from "../../components/nap-header";
import type { Metadata } from "next";
import LiquidField from "../../components/liquid-field";
import "../../contrast.css";

export const metadata: Metadata = {
  title: "A little less friction.",
  description: "A placeholder post for the Nap blog.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/blogs/hello-nap" },
};

export default function PlaceholderPost() {
  return (
    <main className="contrast-page">
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">PLACEHOLDER POST · 1 MIN READ</span>
          <h1>A little less friction.</h1>
          <p>Good tools give you room to think. Nap brings the coding agents you already use into one native workspace, so you can spend more time making things.</p>
          <p>This blog will be a place for product updates, ideas, and notes from behind the scenes.</p>
          <p className="nap-placeholder-note">This is a placeholder post. The first story is still to come.</p>
        </article>
      </section>
      <LiquidField />
    </main>
  );
}
