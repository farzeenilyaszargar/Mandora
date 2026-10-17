import StructuredData from "../components/structured-data";
import { pages, pageMetadata, blogSchema } from "../lib/seo";
import Link from "next/link";
import NapHeader from "../components/nap-header";
import DeferredLiquidField from "../components/deferred-liquid-field";
import "../contrast.css";

export const metadata = pageMetadata(pages.blogs);

export default function BlogsPage() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={blogSchema()} />
      <NapHeader />
      <section className="nap-hero">
        <div className="nap-blog-index">
          <div className="nap-blog-intro">
            <h1>BLOGS.</h1>
            <p>Notes on what we’re building.<br />And why it matters to us.</p>
          </div>
          <Link className="nap-blog-row" href="/blogs/hello-nap">
            <span className="nap-blog-number">01</span>
            <h2>Why We Started</h2>
            <p>A native app for building with coding agents, from the first prompt to the next change.</p>
          </Link>
          <Link className="nap-blog-row" href="/blogs/why">
            <span className="nap-blog-number">02</span>
            <h2>Why This?</h2>
            <p>Open a project, work with an agent, and review the result—all inside Nap.</p>
          </Link>
        </div>
      </section>
      <DeferredLiquidField />
    </main>
  );
}
