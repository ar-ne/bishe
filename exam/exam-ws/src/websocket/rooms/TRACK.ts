import { WSCallback, WSCallback_ARG } from '../types';

export const TRACK = (
  { redis, user, socket }: WSCallback_ARG): WSCallback[] => {
  return [{
    event: 'init',
    callback: async (log) => {
      socket.emit('update', await redis.getAllTracker());
    },
  }];
};