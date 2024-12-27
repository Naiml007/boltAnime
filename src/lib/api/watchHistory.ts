import { supabase } from '../supabase';
import type { WatchHistoryEntry, WatchStatus } from '../types';

interface CreateWatchHistoryParams {
  anime_id: string;
  episode_id: string;
  episode_number: number;
  watch_status: WatchStatus;
  notes?: string;
}

export const watchHistoryApi = {
  async create(params: CreateWatchHistoryParams): Promise<WatchHistoryEntry> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('watch_history')
      .insert({
        user_id: user.id,
        ...params,
        watched_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('This exact watch history entry already exists');
      }
      throw error;
    }

    return data;
  },

  async getByAnime(animeId: string): Promise<WatchHistoryEntry[]> {
    const { data, error } = await supabase
      .from('watch_history')
      .select('*')
      .eq('anime_id', animeId)
      .order('episode_number', { ascending: true });

    if (error) throw error;
    return data;
  },

  async updateStatus(
    entryId: string, 
    watch_status: WatchStatus, 
    notes?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('watch_history')
      .update({ watch_status, notes })
      .eq('id', entryId);

    if (error) throw error;
  }
}