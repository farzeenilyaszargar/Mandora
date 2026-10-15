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
        <div className="nap-blog-index">
          <div className="nap-blog-intro">
            <h1>BLOGS.</h1>
            <p>Notes on what we’re building.<br />And why it matters to us.</p>
          </div>
          <div className="nap-blog-index-label"><span>INDEX / 02</span><span>THOUGHTS FROM NAP</span></div>
          <a className="nap-blog-row" href="/blogs/hello-nap">
            <span className="nap-blog-number">01</span>
            <h2>Why We Started</h2>
            <p>One workspace, fewer interruptions. The idea that became Nap.</p>
            <span className="nap-blog-time">2 MIN<br />DRAFT</span>
          </a>
          <a className="nap-blog-row" href="/blogs/why">
            <span className="nap-blog-number">02</span>
            <h2>Why?</h2>
            <p>A small question behind the way we think about tools.</p>
            <span className="nap-blog-time">2 MIN<br />DRAFT</span>
          </a>
        </div>
      </section>
      <LiquidField />
    </main>
  );
}
