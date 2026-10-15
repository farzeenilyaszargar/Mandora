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
      <header className="nap-header">
        <a href="/" className="nap-wordmark" aria-label="Nap home">nap<span>®</span></a>
        <nav className="nap-nav" aria-label="Main navigation">
          <a className="nap-docs" href="/">HOME</a>
          <a className="nap-docs" href="https://github.com/farzeenilyaszargar/NotNap/releases">CHANGELOG</a>
        </nav>
      </header>
      <section className="nap-hero">
        <div className="nap-blog-content">
          <h1>BLOGS.</h1>
          <p>No posts yet. Check back soon.</p>
        </div>
      </section>
      <LiquidField />
    </main>
  );
}
