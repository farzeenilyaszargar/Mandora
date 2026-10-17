import type { Metadata } from "next";

export const pageTitle = (label: string) => `Nap | ${label}`;
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
const brandKeywords = ["Nap", "Nap Code", "nap.cx"];

export const site = {
  name: "Nap",
  alternateName: "Nap Code",
  url: "https://www.nap.cx",
  title: pageTitle("The Interface For All Your Agents"),
  description: "Nap is a native AI coding app for Mac. Bring your coding agents into one workspace to open projects, chat with agents, and review code changes.",
  image: "/opengraph-image",
  logo: "/nap-logo-1ce51f1d.png",
};

export const pages = {
  home: {
    path: "/", title: site.title, description: site.description,
    keywords: ["AI coding app for Mac", "AI coding workspace", "coding agent interface", "agentic coding", "Claude Code", "Codex", "Cursor", "OpenCode", "Grok Bot"],
  },
  blogs: {
    path: "/blogs", title: pageTitle("Blogs"),
    description: "Read the Nap blog: the ideas behind a native AI coding workspace for Mac, working with coding agents, and turning conversations into code changes.",
    keywords: ["Nap blog", "AI coding agents", "native Mac app", "coding workspace"],
  },
  story: {
    path: "/blogs/hello-nap", title: pageTitle("Why We Started"),
    description: "Why we started Nap: one native Mac workspace for your coding agents, project conversations, and code review, with more room for your own thinking.",
    keywords: ["Nap story", "AI coding workflow", "coding agent workspace", "Mac development app"],
  },
  why: {
    path: "/blogs/why", title: pageTitle("Why This?"),
    description: "Explore how Nap brings AI coding agents into one native Mac app. Open a project, choose an agent, follow the conversation, and review code changes.",
    keywords: ["how Nap works", "AI coding app", "coding agent interface", "Claude Code workspace", "Codex workspace"],
  },
};

type Page = (typeof pages)[keyof typeof pages];
const absolute = (path: string) => new URL(path, site.url).toString();
const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export const indexing: Metadata["robots"] = {
  index: isIndexable,
  follow: true,
  googleBot: { index: isIndexable, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

export function pageMetadata(page: Page, article = false): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: [...brandKeywords, ...page.keywords],
    alternates: { canonical: page.path },
    openGraph: {
      type: article ? "article" : "website",
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: site.image, width: 1200, height: 630, type: "image/png", alt: "Nap — Your agents. All together. Native AI coding app for Mac." }],
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

// Shared entity definitions make each page understandable on its own, including
// articles reached directly from search. Only published facts belong here.
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": organizationId, name: site.name, alternateName: site.alternateName, url: site.url, logo: { "@type": "ImageObject", url: absolute(site.logo), width: 256, height: 256 }, sameAs: ["https://x.com/napverse"] },
      { "@type": "WebSite", "@id": websiteId, name: site.name, alternateName: [site.alternateName, "nap.cx"], url: site.url, description: site.description, publisher: { "@id": organizationId }, inLanguage: "en" },
    ],
  };
}

function breadcrumbSchema(page: Page) {
  const items = [{ name: "Nap", item: absolute("/") }];
  if (page.path !== "/") items.push({ name: "Blogs", item: absolute(pages.blogs.path) });
  if (page === pages.story || page === pages.why) items.push({ name: page === pages.story ? "Why We Started" : "Why This?", item: absolute(page.path) });
  return {
    "@type": "BreadcrumbList", "@id": `${absolute(page.path)}#breadcrumbs`,
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
  };
}

function webPageSchema(page: Page, type = "WebPage") {
  return {
    "@type": type, "@id": `${absolute(page.path)}#webpage`, url: absolute(page.path),
    name: page.title, description: page.description, inLanguage: "en",
    isPartOf: { "@id": websiteId }, publisher: { "@id": organizationId },
    ...(page.path !== "/" ? { breadcrumb: { "@id": `${absolute(page.path)}#breadcrumbs` } } : {}),
  };
}

export function homeSchema() {
  const appId = `${site.url}/#app`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(pages.home), mainEntity: { "@id": appId }, about: { "@id": appId } },
      { "@type": "SoftwareApplication", "@id": appId, name: site.name, alternateName: site.alternateName, url: site.url, applicationCategory: "DeveloperApplication", operatingSystem: "macOS", description: site.description, image: absolute(site.image), screenshot: absolute("/nap-ui-240fdfdf.webp"), publisher: { "@id": organizationId }, featureList: ["Native coding agent interface", "Project conversations", "Agent selection", "Code change review"] },
    ],
  };
}

export function blogSchema() {
  const blogId = `${site.url}/blogs#blog`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(pages.blogs, "CollectionPage"), mainEntity: { "@id": blogId } },
      breadcrumbSchema(pages.blogs),
      { "@type": "Blog", "@id": blogId, name: "Nap Blog", url: absolute(pages.blogs.path), description: pages.blogs.description, inLanguage: "en", publisher: { "@id": organizationId },
        blogPost: [pages.story, pages.why].map((page) => ({ "@type": "BlogPosting", "@id": `${absolute(page.path)}#article`, url: absolute(page.path), headline: page === pages.story ? "Why We Started" : "Why This?" })),
      },
    ],
  };
}

export function articleSchema(page: typeof pages.story | typeof pages.why) {
  const articleId = `${absolute(page.path)}#article`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(page), mainEntity: { "@id": articleId } },
      breadcrumbSchema(page),
      { "@type": "BlogPosting", "@id": articleId,
        headline: page === pages.story ? "Why We Started" : "Why This?",
        description: page.description, url: absolute(page.path),
        image: { "@type": "ImageObject", url: absolute(site.image), width: 1200, height: 630 },
        mainEntityOfPage: { "@id": `${absolute(page.path)}#webpage` },
        author: { "@id": organizationId }, publisher: { "@id": organizationId },
        isPartOf: { "@id": `${site.url}/blogs#blog` }, inLanguage: "en",
      },
    ],
  };
}
