-- Wholegacy Ratecard v17
-- Run once in Neon SQL Editor before deploying v17.
alter table creator_profiles add column if not exists color_pattern varchar(60) not null default '';
alter table creator_profiles drop constraint if exists creator_profiles_theme_check;
alter table creator_profiles add constraint creator_profiles_theme_check check (theme in (
  'cream-editorial','dark-bento-neon','pastel-lookbook','minimal-mono','aura-glass',
  'brutalist-paper','luxury-gold','kawaii-dashboard','modern-sidebar-pro','magazine-cover-hero',
  'minimal','creator','dark-pro','editorial'
));
update creator_profiles set theme='cream-editorial' where theme='editorial';
update creator_profiles set theme='minimal-mono' where theme='minimal';
update creator_profiles set theme='modern-sidebar-pro' where theme='creator';
update creator_profiles set theme='dark-bento-neon' where theme='dark-pro';
