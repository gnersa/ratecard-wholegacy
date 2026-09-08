-- Wholegacy Ratecard v4 migration
-- Jalankan SEKALI di Neon SQL Editor setelah schema v2/v3 sudah ada.

ALTER TABLE social_accounts ADD COLUMN IF NOT EXISTS average_views_min bigint NOT NULL DEFAULT 0;
ALTER TABLE social_accounts ADD COLUMN IF NOT EXISTS average_views_max bigint NOT NULL DEFAULT 0;
ALTER TABLE social_accounts ADD COLUMN IF NOT EXISTS content_style text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS collaboration_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label varchar(180) NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS collaboration_experiences_user_idx ON collaboration_experiences(user_id);

CREATE TABLE IF NOT EXISTS terms_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS terms_conditions_user_idx ON terms_conditions(user_id);

ALTER TABLE creator_profiles DROP CONSTRAINT IF EXISTS creator_profiles_theme_check;
ALTER TABLE creator_profiles ADD CONSTRAINT creator_profiles_theme_check
  CHECK (theme IN ('minimal','creator','dark-pro','editorial'));
