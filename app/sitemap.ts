import type { MetadataRoute } from "next";
import { site, pages, isIndexable } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];
  return Object.values(pages).map((page) => ({ url: new URL(page.path, site.url).toString() }));
}
