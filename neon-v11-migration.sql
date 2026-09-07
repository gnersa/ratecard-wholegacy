-- Wholegacy Ratecard v11: database-backed media fallback when Vercel Blob is not connected.
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  kind varchar(20) not null check (kind in ('avatar','cover')),
  content_type varchar(100) not null,
  file_name varchar(255),
  data bytea not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_media_assets_user_id on media_assets(user_id);
