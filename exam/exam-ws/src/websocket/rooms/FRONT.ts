import { WSCallback, WSCallback_ARG } from '../types';
import { WSClients } from '../ws-utils';

//前端与后端通信
export const FRONT = (
  { redis, user }: WSCallback_ARG): WSCallback[] => {
  return [
    {
      event: 'Middleware/UserStateMonitor',
      callback: async (log, dat) => {
        log(dat);
        await redis.Tracker().update(dat);
        WSClients.TRACK.broadcast('update', await redis.getAllTracker());
      },
    },
    {
      event: 'submit/answer',
      callback: async (log, qID: number) => {
        log(user.name, 'submit/answer');
        WSClients.CLIENT.emit(user.token, 'submit/answer', {
          qID: qID,
          user: user.name,
        });
      },
    },
    {
      event: 'submit/template',
      callback: async (log, name: string) => {
        log('submit/template');
        WSClients.CLIENT.emit(user.token, 'submit/template', {
          name,
          user: user.name,
        });
      },
    },
  ];
};