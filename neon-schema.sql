-- Wholegacy Ratecard v2
-- Jalankan seluruh file ini sekali di Neon > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  email varchar(255) not null,
  password_hash text,
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists users_email_lower_idx on users (lower(email));

create table if not exists creator_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  username varchar(30) not null,
  display_name varchar(120) not null,
  bio text not null default '',
  category varchar(100) not null default '',
  location varchar(120) not null default '',
  avatar_url text not null default '',
  cover_url text not null default '',
  contact_email varchar(255) not null default '',
  whatsapp varchar(50) not null default '',
  theme varchar(30) not null default 'minimal',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint creator_profiles_theme_check check (theme in ('minimal','creator','dark-pro'))
);
create unique index if not exists creator_profiles_username_lower_idx on creator_profiles (lower(username));

create table if not exists social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  platform varchar(50) not null,
  handle varchar(120) not null default '',
  url text not null default '',
  followers bigint not null default 0,
  average_views bigint not null default 0,
  engagement_rate numeric(8,2) not null default 0,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists social_accounts_user_idx on social_accounts(user_id);

create table if not exists rate_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  platform varchar(80) not null,
  service_name varchar(160) not null,
  price numeric(18,2) not null default 0,
  currency varchar(10) not null default 'IDR',
  description text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists rate_items_user_idx on rate_items(user_id);
