/*
  # Create watch history table

  1. New Tables
    - `watch_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `anime_id` (text)
      - `episode_id` (text)
      - `watched_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `watch_history` table
    - Add policies for authenticated users to:
      - Read their own watch history
      - Insert their own watch history
*/

CREATE TABLE IF NOT EXISTS watch_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  anime_id text NOT NULL,
  episode_id text NOT NULL,
  watched_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own watch history"
  ON watch_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own watch history"
  ON watch_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX watch_history_user_id_idx ON watch_history(user_id);
CREATE INDEX watch_history_anime_id_idx ON watch_history(anime_id);