import axios from 'axios';

const BASE_URL = 'https://api-consumet-org-pb65.onrender.com/anime/gogoanime';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const api = {
  search: async (query: string, page = 1) => {
    return client.get(`/search?keyw=${query}&page=${page}`).then(res => res.data);
  },

  getRecentEpisodes: async (page = 1) => {
    return client.get(`/recent-episodes?page=${page}`).then(res => res.data);
  },

  getTopAiring: async () => {
    return client.get('/top-airing').then(res => res.data);
  },

  getAnimeInfo: async (id: string) => {
    return client.get(`/info/${id}`).then(res => res.data);
  },

  getEpisodeStream: async (episodeId: string) => {
    return client.get(`/watch/${episodeId}`).then(res => res.data);
  }
};