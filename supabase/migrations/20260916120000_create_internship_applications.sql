create table if not exists public.internship_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text,
  degree text,
  graduation_year text not null,
  role_wanted text not null,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  about_self text not null,
  resume_path text,
  resume_filename text,
  resume_mime_type text,
  source text not null default 'internship_application',
  status text not null default 'new',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.internship_applications enable row level security;

create index if not exists internship_applications_created_at_idx
  on public.internship_applications (created_at desc);

create index if not exists internship_applications_role_wanted_idx
  on public.internship_applications (role_wanted);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'internship-resumes',
  'internship-resumes',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
