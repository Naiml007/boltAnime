import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from '../lib/api';
import { supabase } from '../lib/supabase';
import { Play } from 'lucide-react';

export function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: anime } = useQuery(['anime', id], () => api.getAnimeInfo(id!));

  const addToHistory = async (episodeId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('watch_history').upsert({
        user_id: user.id,
        anime_id: id,
        episode_id: episodeId,
        watched_at: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {anime && (
          <div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
                <p className="text-gray-300 mb-6">{anime.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-gray-400">Status</h3>
                    <p>{anime.status}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400">Released</h3>
                    <p>{anime.releaseDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Episodes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {anime.episodes?.map((episode: any) => (
                  <button
                    key={episode.id}
                    onClick={() => addToHistory(episode.id)}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Play className="h-6 w-6 mb-2" />
                    <span>Episode {episode.number}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}