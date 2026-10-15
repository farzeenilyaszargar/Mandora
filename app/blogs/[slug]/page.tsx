import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NapHeader from "../../components/nap-header";
import LiquidField from "../../components/liquid-field";
import { posts } from "../posts";
import "../../contrast.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.summary,
    robots: { index: false, follow: true },
    alternates: { canonical: `/blogs/${post.slug}` },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  return (
    <main className="contrast-page nap-article-page">
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">PLACEHOLDER POST · 2 MIN READ</span>
          <h1>{post.title}</h1>
          <p>{post.intro}</p>
          {post.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <p className="nap-placeholder-note">This is a placeholder draft. Final editorial content will replace it.</p>
        </article>
      </section>
      <LiquidField />
    </main>
  );
}
