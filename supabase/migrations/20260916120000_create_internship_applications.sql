create table if not exists public.internship_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text,
  university text not null,
  degree text,
  graduation_year text not null,
  location text,
  role_track text not null,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  availability_start text,
  weekly_hours text,
  why_nap text not null,
  experience text not null,
  source text not null default 'internship_application',
  status text not null default 'new',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.internship_applications enable row level security;

create index if not exists internship_applications_created_at_idx
  on public.internship_applications (created_at desc);

create index if not exists internship_applications_role_track_idx
  on public.internship_applications (role_track);
