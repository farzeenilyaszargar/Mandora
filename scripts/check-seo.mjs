import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Validate what crawlers receive, rather than only the metadata source objects.
const root = resolve(import.meta.dirname, "..");
const output = resolve(root, ".next/server/app");
const origin = "https://www.nap.cx";
const preview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
const routes = [
  ["index", "/", "Nap | The Interface For All Your Agents"],
  ["blogs", "/blogs", "Nap | Blogs"],
  ["blogs/hello-nap", "/blogs/hello-nap", "Nap | Why We Started"],
  ["blogs/why", "/blogs/why", "Nap | Why This?"],
];
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}
const descriptions = new Set();
for (const [file, path, title] of routes) {
  const html = readFileSync(resolve(output, `${file}.html`), "utf8");
  const titles = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(titles.length, 1, `${path}: one title`);
  assert.equal(decode(titles[0][1]), title);
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const get = (key) => meta.find((item) => item.name === key || item.property === key)?.content;
  assert.ok(get("description")?.length >= 70 && get("description").length <= 180, `${path}: useful description`);
  assert.ok(!descriptions.has(get("description")), `${path}: unique description`);
  descriptions.add(get("description"));
  assert.equal(get("og:title"), title);
  assert.equal(get("twitter:title"), title);
  assert.equal(get("og:description"), get("description"));
  assert.equal(new URL(get("og:url")).href, origin + path);
  assert.ok(get("og:image")?.startsWith(origin + "/opengraph-image"));
  assert.ok(get("keywords")?.startsWith("Nap,Nap Code,nap.cx,"));
  assert.equal(get("robots")?.includes("noindex"), preview);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((item) => item.rel === "canonical");
  assert.deepEqual(canonicals.map((item) => new URL(item.href).href), [origin + path]);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one primary heading`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  const entities = graphs.flatMap((graph) => graph["@graph"] ?? [graph]);
  assert.ok(entities.some((entity) => entity["@type"] === "Organization" && entity.logo?.url.startsWith(origin)), `${path}: publisher identity and logo`);
  assert.ok(entities.some((entity) => entity["@type"] === "WebSite"));
  assert.ok(entities.some((entity) => entity["@id"] === `${origin}${path}#webpage`));
  if (path !== "/") {
    const breadcrumb = entities.find((entity) => entity["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement.at(-1).item, origin + path);
  }
  if (path.startsWith("/blogs/")) {
    const article = entities.find((entity) => entity["@type"] === "BlogPosting");
    assert.ok(article.image.url.startsWith(origin));
    assert.ok(article.author["@id"].endsWith("#organization"));
  }
  for (const entity of entities) {
    assert.equal(entity.aggregateRating, undefined, "no invented ratings");
    assert.equal(entity.offers, undefined, "no unconfirmed pricing");
  }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => attributes(tag));
  for (const image of images) {
    assert.ok(image.width && image.height, `${path}: images reserve layout space`);
    if (image.src?.startsWith("/")) assert.ok(existsSync(resolve(root, "public", image.src.slice(1))), `${path}: image exists`);
  }
  console.log(`✓ ${path}: metadata, canonical, social cards, structured data, headings, and images`);
}
const missing = readFileSync(resolve(output, "_not-found.html"), "utf8");
assert.ok(missing.includes('content="noindex'));
assert.ok(!missing.includes('rel="canonical"'), "404 must not canonicalize to the homepage");
const sitemap = readFileSync(resolve(output, "sitemap.xml.body"), "utf8");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations, preview ? [] : routes.map(([, path]) => origin + path));
const robots = readFileSync(resolve(output, "robots.txt.body"), "utf8");
assert.ok(robots.includes("Allow: /"));
assert.equal(robots.includes(`Sitemap: ${origin}/sitemap.xml`), !preview);
console.log("✓ 404 noindex, sitemap coverage, and crawler access");
