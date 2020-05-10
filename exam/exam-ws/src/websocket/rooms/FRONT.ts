import { WSCallback, WSCallback_ARG } from '../types';
import { clog } from '../../utils';
import { WSClients } from '../ws-utils';

//前端与后端通信
export const FRONT = (
  { redis, user }: WSCallback_ARG): WSCallback[] => {
  return [
    {
      event: 'Middleware/UserStateMonitor',
      callback: async (dat) => {
        const d = JSON.parse(dat);
        clog(user.name, JSON.parse(dat));
        await redis.Tracker().update(d);
      },
    },
    {
      event: 'submit',
      callback: async () => {
        clog(user.name, 'submit');
        const socketSet=WSClients.CLIENT.get(user.token);
        socketSet?.forEach((value) => {
          value.emit('submit');
        });
      },
    },
  ];
};