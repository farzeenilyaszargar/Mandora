# Nap Website

Landing website for Nap, a native interface for running coding agents from one focused workspace.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- `next/font` with Fustat and Ma Shan Zheng

## Pages

- `/` - Main landing page with hero, agent support, preview image, trusted logos, feature grid, and download modal.
- `/docs` - Documentation-style page with a left topic nav and scroll-aware active section.
- `/enterprise` - Enterprise page with team benefits and an inquiry form.
- `/waitlist` - Waitlist form for Windows/Linux interest.

The old `/download` page has been removed. Download actions now open a floating modal from the navbar. The macOS download currently points to `public/download.txt` as a placeholder, and Windows/Linux route to the waitlist.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server on port 3000:

```bash
npm run dev -- --port 3000
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Notes

- Main page: `app/page.tsx`
- Shared download modal: `app/components/download-modal.tsx`
- Docs interactive content: `app/docs/docs-client.tsx`
- Waitlist form logic: `app/waitlist/waitlist-form.tsx`
- Waitlist API route: `app/api/waitlist/route.ts`
- Supabase migration: `supabase/migrations/20260824170000_create_wishlist_saves.sql`
- Static assets live in `public/`

## Supabase

The waitlist form writes to the `public.wishlist_saves` table in Supabase project `ywfkomtyadqkyugiibhi`.

Required environment variables:

```bash
SUPABASE_URL=https://ywfkomtyadqkyugiibhi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Apply the migration with Supabase CLI after linking the project:

```bash
supabase link --project-ref ywfkomtyadqkyugiibhi
supabase db push
```
