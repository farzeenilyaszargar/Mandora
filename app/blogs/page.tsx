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
    <main className="contrast-page nap-article-page">
      <NapHeader />
      <section className="nap-hero">
        <div className="nap-blog-content">
          <h1>BLOGS.</h1>
          <a className="nap-blog-card" href="/blogs/hello-nap">
            <span className="nap-blog-label">PLACEHOLDER POST · 2 MIN READ</span>
            <h2>Our story</h2>
            <p>Why we’re bringing your coding agents into one native workspace, with less switching and more room to think.</p>
          </a>
        </div>
      </section>
      <LiquidField />
    </main>
  );
}
