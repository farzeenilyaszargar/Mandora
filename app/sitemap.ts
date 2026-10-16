import type { MetadataRoute } from "next";
import { site, pages } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((page) => ({ url: new URL(page.path, site.url).toString() }));
}
