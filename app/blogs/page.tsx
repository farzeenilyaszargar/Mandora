import NapHeader from "../components/nap-header";
import type { Metadata } from "next";
import LiquidField from "../components/liquid-field";
import "../contrast.css";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Notes and updates from Nap.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <main className="contrast-page">
      <NapHeader />
      <section className="nap-hero">
        <div className="nap-blog-content">
          <h1>BLOGS.</h1>
          <a className="nap-blog-card" href="/blogs/hello-nap">
            <span className="nap-blog-label">PLACEHOLDER POST · 1 MIN READ</span>
            <h2>A little less friction.</h2>
            <p>A space for ideas, updates, and the story behind Nap.</p>
          </a>
        </div>
      </section>
      <LiquidField />
    </main>
  );
}
