/*
  # Enhanced Watch History Schema

  1. New Fields and Enhancements
    - Added episode_number field with default value
    - Added watch_status enum type
    - Added notes field
    - Added constraints and validations
    - Enhanced indexing for better performance

  2. Changes
    - Created watch_status enum type
    - Added new columns with proper defaults
    - Added constraints for data integrity
    - Created composite index for efficient querying

  3. Security
    - Maintained existing RLS policies
    - Added validation checks
*/

-- Create enum for watch status
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'watch_status') THEN
    CREATE TYPE watch_status AS ENUM ('completed', 'in-progress', 'dropped');
  END IF;
END $$;

-- Add new columns to watch_history table
ALTER TABLE watch_history 
  ADD COLUMN IF NOT EXISTS episode_number INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS watch_status watch_status DEFAULT 'in-progress',
  ADD COLUMN IF NOT EXISTS notes TEXT;

-- Set NOT NULL constraints after adding columns
ALTER TABLE watch_history 
  ALTER COLUMN episode_number SET NOT NULL,
  ALTER COLUMN watch_status SET NOT NULL;

-- Add episode number constraint
ALTER TABLE watch_history 
  ADD CONSTRAINT episode_number_positive CHECK (episode_number > 0);

-- Create composite index for efficient querying
CREATE INDEX IF NOT EXISTS watch_history_user_anime_idx 
  ON watch_history(user_id, anime_id, episode_number);

-- Create unique constraint to prevent exact duplicates
CREATE UNIQUE INDEX IF NOT EXISTS watch_history_unique_entry_idx 
  ON watch_history(user_id, anime_id, episode_number, watch_status) 
  WHERE notes IS NULL;