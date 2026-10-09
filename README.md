# Nap Website

Landing website for Nap, a native interface for running coding agents from one focused workspace.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- `next/font` with Fustat and Ma Shan Zheng

## Pages

- `/` - Basic landing page: a narrow serif-text column, white background, short copy, and a bordered macOS download link.
- `/docs` - Documentation-style page with a left topic nav and scroll-aware active section.
- `/waitlist` - Waitlist form for Windows/Linux interest.

The old `/download` page has been removed. The homepage links directly to the latest macOS DMG on GitHub. Other pages retain the shared download modal, with Windows/Linux interest collected through the waitlist.

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
