-- Wholegacy Ratecard v5 migration
-- Run once in Neon SQL Editor.
ALTER TABLE creator_profiles ADD COLUMN IF NOT EXISTS language varchar(5) NOT NULL DEFAULT 'id';
ALTER TABLE creator_profiles DROP CONSTRAINT IF EXISTS creator_profiles_language_check;
ALTER TABLE creator_profiles ADD CONSTRAINT creator_profiles_language_check CHECK (language IN ('id','en'));
