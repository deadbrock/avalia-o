import Redis from 'ioredis';

// Criar cliente Redis
const getRedisClient = () => {
  const redisUrl = process.env.REDIS_URL || process.env.KV_URL;
  
  if (!redisUrl) {
    throw new Error('REDIS_URL não configurada');
  }
  
  return new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });
};

let redis: Redis | null = null;

export const getRedis = () => {
  if (!redis) {
    redis = getRedisClient();
  }
  return redis;
};

// Funções auxiliares
export const redisGet = async <T>(key: string): Promise<T | null> => {
  const redis = getRedis();
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const redisSet = async (key: string, value: any): Promise<void> => {
  const redis = getRedis();
  await redis.set(key, JSON.stringify(value));
};

export const redisDel = async (key: string): Promise<void> => {
  const redis = getRedis();
  await redis.del(key);
};

