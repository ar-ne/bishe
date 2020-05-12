import Redis from 'ioredis';
import { WorkspaceSession } from './models';

export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const client = new Redis(6379, process.env.REDIS_HOST || 'localhost');
client.on('error', (err) => console.log(`RedisError:${err}`));
export const CONTAINER_ROUTE_KEY = '__workspace_route_by_';

class RedisService {
  ContainerRoute = (w: WorkspaceSession) => {
    const key = CONTAINER_ROUTE_KEY + w.containerID;
    return {
      set: () => {
        client.set(key, w.address!);
      },
      del: () => {
        client.del(key);
      },
    };
  };
}

export const redisService = new RedisService();
