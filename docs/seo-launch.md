# nap.cx SEO launch

The canonical production origin is `https://www.nap.cx`. The shared configuration is in `app/lib/seo.ts`.

## Search positioning

- Brand: Nap, Nap Code, nap.cx.
- Product: native AI coding app for Mac, coding agent workspace, agentic coding.
- Supported agents: Claude Code, Codex, Cursor, OpenCode, Grok Bot.

Titles, page descriptions, visible homepage copy, social cards, and structured data describe the same native app. Metadata keywords are supplementary; ranking is not guaranteed. No ratings, pricing, reviews, or publication dates have been invented.

## Before launch

1. Finish purchasing the domain and connect `nap.cx` and `www.nap.cx` to the production host. Enable HTTPS. Set `www.nap.cx` as the served domain and `nap.cx` to redirect to it, matching the current Vercel configuration.
2. Deploy this branch. Canonical URLs and crawler files already reference `nap.cx`.
3. If you control the old `nap-code.com` domain, keep it connected to this deployment or configure equivalent permanent redirects at its host. The app includes host-based 308 redirects from the old domain to `www.nap.cx`, preserving paths and queries. Configure the apex-to-www redirect only in the hosting domain settings; do not add an opposing application redirect. These rules do not configure DNS or another hosting provider.
4. Verify a `nap.cx` domain property in Google Search Console using the DNS record supplied by Google. Then submit `https://www.nap.cx/sitemap.xml` and inspect the homepage and blog URLs. No account verification token is embedded in the repository.
5. Check the live canonical URLs, robots.txt, sitemap.xml, social preview, and redirects after deployment. Confirm there are no hosting-level indexing blocks on the production domain.
6. Keep preview deployments excluded from indexing in the hosting configuration; production should remain indexable.
7. If the old domain was indexed, verify both properties and use Search Console’s Change of Address process after redirects are live.

## Implemented

- Page-specific canonical URLs, titles, descriptions, Open Graph URLs, and Twitter cards.
- Brand/site/app structured data on the homepage, a blog collection, and individual article data.
- Static robots.txt and sitemap.xml generated from the canonical site configuration.
- A static 1200×630 social image rendered by Next.js at `/opengraph-image`.
- Existing responsive, cached images and deferred decorative JavaScript remain in place.

## References

- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
