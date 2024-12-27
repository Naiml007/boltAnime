import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../lib/api';
import { AnimeCard } from '../components/AnimeCard';

export function Home() {
  const { data: recentEpisodes } = useQuery('recentEpisodes', () => api.getRecentEpisodes());
  const { data: topAiring } = useQuery('topAiring', () => api.getTopAiring());

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Episodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recentEpisodes?.results?.slice(0, 10).map((anime: any) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.image}
                episodeNumber={anime.episodeNumber}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Top Airing</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topAiring?.results?.slice(0, 10).map((anime: any) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.image}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}