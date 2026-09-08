-- Wholegacy Ratecard v17.5.2 database compatibility fix
-- Safe/idempotent: jalankan sekali di Neon > SQL Editor.
-- Memastikan schema profile kompatibel dengan 10 desain + color palette terbaru.

begin;

alter table creator_profiles
  add column if not exists color_pattern varchar(80) not null default '';

alter table creator_profiles
  add column if not exists language varchar(5) not null default 'id';

alter table creator_profiles
  alter column theme type varchar(40),
  alter column color_pattern type varchar(80);

alter table creator_profiles
  drop constraint if exists creator_profiles_theme_check;

alter table creator_profiles
  add constraint creator_profiles_theme_check check (theme in (
    'cream-editorial',
    'dark-bento-neon',
    'pastel-lookbook',
    'minimal-mono',
    'aura-glass',
    'brutalist-paper',
    'luxury-gold',
    'kawaii-dashboard',
    'modern-sidebar-pro',
    'magazine-cover-hero',
    'minimal',
    'creator',
    'dark-pro',
    'editorial'
  ));

alter table creator_profiles
  drop constraint if exists creator_profiles_language_check;

alter table creator_profiles
  add constraint creator_profiles_language_check check (language in ('id','en'));

-- Normalize legacy design ids after the new constraint accepts both old and new ids.
update creator_profiles set theme='cream-editorial' where theme='editorial';
update creator_profiles set theme='minimal-mono' where theme='minimal';
update creator_profiles set theme='modern-sidebar-pro' where theme='creator';
update creator_profiles set theme='dark-bento-neon' where theme='dark-pro';

commit;
