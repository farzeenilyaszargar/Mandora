# Nap Website

Nap’s dark product website with a liquid cursor interaction, product UI preview, agent support, and blog articles.

## Pages

- `/` — Product landing page.
- `/blogs` — Blog listing.
- `/blogs/hello-nap` — Why We Started.
- `/blogs/why` — Why This?

The former documentation, application, and waitlist pages and their form APIs have been removed. The site does not require Supabase credentials to serve its current pages.

## Development

```bash
npm install
npm run dev -- --port 3000
```

Open [localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Source

- Homepage: `app/page.tsx`
- Shared navigation: `app/components/nap-header.tsx`
- Download button: `app/components/nap-download.tsx`
- Liquid interaction: `app/components/liquid-field.tsx`
- Site styles: `app/contrast.css`
- Blog pages: `app/blogs/`
- Static assets and sitemap: `public/`

The download button links to the existing GitHub release asset. Release and installation verification are currently deferred.

Images are served from content-versioned WebP assets. The cursor effect uses viewport-sized canvases and pauses for hidden tabs, reduced motion, and touch-only devices.

Internal links use prefetched client navigation. Product screenshots use build-time responsive WebP variants, avoiding on-demand image resizing. Content-versioned WebP files have immutable year-long caching. The homepage screenshot loads eagerly; article screenshots and logos load lazily. The decorative cursor module loads after critical content or desktop interaction.
