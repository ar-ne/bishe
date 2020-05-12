import { WSCallback, WSCallback_ARG } from '../types';
import { WSClients } from '../ws-utils';

//前端与后端通信
export const FRONT = (
  { redis, user }: WSCallback_ARG): WSCallback[] => {
  return [
    {
      event: 'Middleware/UserStateMonitor',
      callback: async (log, dat) => {
        const d = JSON.parse(dat);
        log(JSON.parse(dat));
        await redis.Tracker().update(d);
        const trackers = await redis.getAllTracker();
        for (const s of WSClients.TRACK.get()) {
          s.emit('update',);
        }
      },
    },
    {
      event: 'submit/answer',
      callback: async (log, qID: number) => {
        log(user.name, 'submit/answer');
        const socketSet = WSClients.CLIENT.get(user.token);
        socketSet?.forEach((value) => {
          value.emit('submit/answer', {
            qID: qID,
            user: user.name,
          });
        });
      },
    },
    {
      event: 'submit/template',
      callback: async (log, name: string) => {
        log('submit/template');
        const socketSet = WSClients.CLIENT.get(user.token);
        socketSet?.forEach((value) => {
          value.emit('submit/template', {
            name,
            user: user.name,
          });
        });
      },
    },
  ];
};