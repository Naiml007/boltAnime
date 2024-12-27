/*
  # Enhanced Watch History Schema

  1. New Fields and Enhancements
    - Added episode_number field
    - Added watch_status enum type
    - Added notes field
    - Added constraints and validations
    - Enhanced indexing for better performance

  2. Changes
    - Created watch_status enum type
    - Added new columns to watch_history table
    - Added constraints for data integrity
    - Created composite index for efficient querying
    - Updated RLS policies

  3. Security
    - Maintained existing RLS policies
    - Added validation checks for data integrity
*/

-- Create enum for watch status
CREATE TYPE watch_status AS ENUM ('completed', 'in-progress', 'dropped');

-- Add new columns to watch_history table
ALTER TABLE watch_history 
  ADD COLUMN IF NOT EXISTS episode_number INTEGER NOT NULL,
  ADD COLUMN IF NOT EXISTS watch_status watch_status NOT NULL DEFAULT 'in-progress',
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD CONSTRAINT episode_number_positive CHECK (episode_number > 0);

-- Create composite index for efficient querying
CREATE INDEX IF NOT EXISTS watch_history_user_anime_idx 
  ON watch_history(user_id, anime_id, episode_number);

-- Create unique constraint to prevent exact duplicates
CREATE UNIQUE INDEX IF NOT EXISTS watch_history_unique_entry_idx 
  ON watch_history(user_id, anime_id, episode_number, watch_status) 
  WHERE notes IS NULL;

-- Add foreign key constraint for user_id (if not already exists)
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'watch_history_user_id_fkey'
  ) THEN
    ALTER TABLE watch_history
      ADD CONSTRAINT watch_history_user_id_fkey 
      FOREIGN KEY (user_id) 
      REFERENCES auth.users(id) 
      ON DELETE CASCADE;
  END IF;
END $$;