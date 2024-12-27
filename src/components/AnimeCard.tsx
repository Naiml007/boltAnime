import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  episodeNumber?: string;
}

export function AnimeCard({ id, title, image, episodeNumber }: AnimeCardProps) {
  return (
    <Link to={`/anime/${id}`} className="group relative">
      <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold truncate">{title}</h3>
            {episodeNumber && (
              <div className="flex items-center text-white/80 text-sm mt-1">
                <Play className="h-4 w-4 mr-1" />
                <span>Episode {episodeNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}