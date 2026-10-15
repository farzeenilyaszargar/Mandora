import { blogSummaries } from "./posts";
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
          <div className="nap-blog-grid">
            {blogSummaries.map((post) => (
              <a className="nap-blog-card" href={`/blogs/${post.slug}`} key={post.slug}>
                <span className="nap-blog-label">PLACEHOLDER POST · 2 MIN READ</span>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <LiquidField />
    </main>
  );
}
