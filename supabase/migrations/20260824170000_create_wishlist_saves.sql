create table if not exists public.wishlist_saves (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  source text not null default 'waitlist',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.wishlist_saves enable row level security;

create index if not exists wishlist_saves_created_at_idx
  on public.wishlist_saves (created_at desc);
