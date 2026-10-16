import type { Metadata } from "next";

export const site = {
  name: "Nap",
  alternateName: "Nap Code",
  url: "https://www.nap.cx",
  title: "Nap | The Interface For All Your Agents",
  description: "Nap brings your coding agents into one native app for Mac. Open projects, chat with agents, and review code changes in one workspace.",
  image: "/opengraph-image",
};

export const pages = {
  home: { path: "/", title: site.title, description: site.description },
  blogs: { path: "/blogs", title: "Nap Blog — AI Coding Agents & Product Stories", description: "Explore the ideas behind Nap, the native AI coding app for Mac. Read about building with coding agents, project conversations, and reviewing code changes." },
  story: { path: "/blogs/hello-nap", title: "Why We Started — The Story Behind Nap", description: "Why we started Nap: a native AI coding app that brings projects, coding agents, conversations, and code review into one workspace for Mac." },
  why: { path: "/blogs/why", title: "Why This? — Building with AI Coding Agents in Nap", description: "See how Nap brings Claude Code, Codex, and other AI coding agents into a native Mac app. Open a project, chat with an agent, and review code changes." },
};

type Page = (typeof pages)[keyof typeof pages];

export function pageMetadata(page: Page, article = false): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: article ? "article" : "website",
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: site.image, width: 1200, height: 630, alt: "Nap — Your agents. All together. Native AI coding app for Mac." }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@napverse",
      creator: "@napverse",
      title: page.title,
      description: page.description,
      images: [{ url: site.image, alt: "Nap — Native AI coding app for Mac" }],
    },
  };
}

export function articleSchema(page: Page) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${site.url}${page.path}#article`,
    headline: page === pages.story ? "Why We Started" : "Why This?",
    description: page.description,
    url: `${site.url}${page.path}`,
    mainEntityOfPage: `${site.url}${page.path}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/blogs#blog` },
    inLanguage: "en",
  };
}
