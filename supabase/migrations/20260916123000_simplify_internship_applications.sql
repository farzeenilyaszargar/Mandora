alter table if exists public.internship_applications
  add column if not exists role_wanted text,
  add column if not exists about_self text,
  add column if not exists resume_path text,
  add column if not exists resume_filename text,
  add column if not exists resume_mime_type text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'internship_applications'
      and column_name = 'role_track'
  ) then
    execute 'update public.internship_applications set role_wanted = coalesce(role_wanted, role_track, ''Software dev'')';
  else
    update public.internship_applications
    set role_wanted = coalesce(role_wanted, 'Software dev');
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'internship_applications'
      and column_name = 'why_nap'
  ) then
    execute 'update public.internship_applications set about_self = coalesce(about_self, nullif(concat_ws('' '', why_nap, experience), ''''), ''Migrated application'')';
  else
    update public.internship_applications
    set about_self = coalesce(about_self, 'Migrated application');
  end if;
end $$;

alter table if exists public.internship_applications
  drop column if exists university,
  drop column if exists location,
  drop column if exists availability_start,
  drop column if exists weekly_hours,
  drop column if exists why_nap,
  drop column if exists experience,
  drop column if exists role_track;

alter table if exists public.internship_applications
  alter column role_wanted set not null,
  alter column about_self set not null;

drop index if exists internship_applications_role_track_idx;

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
