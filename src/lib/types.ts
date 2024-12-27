export type WatchStatus = 'completed' | 'in-progress' | 'dropped';

export interface WatchHistoryEntry {
  id: string;
  user_id: string;
  anime_id: string;
  episode_id: string;
  episode_number: number;
  watch_status: WatchStatus;
  notes?: string;
  watched_at: string;
  created_at: string;
}