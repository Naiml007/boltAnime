import Redis from 'ioredis';

let redis: Redis | null = null;

try {
  redis = new Redis('rediss://red-cjt06nnhdsdc739sl1og:iFHqEh2BlARgopucHlRF7oJc9kX1nMeX@singapore-redis.render.com:6379', {
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 1,
    connectTimeout: 5000,
    enableOfflineQueue: false,
  });

  redis.on('error', (error) => {
    console.error('Redis connection error:', error);
  });
} catch (error) {
  console.error('Failed to initialize Redis:', error);
  redis = null;
}

export { redis };