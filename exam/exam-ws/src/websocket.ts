import { Socket } from 'socket.io';
import { Record, UserControllerApi, UserInfo } from './generated/openapi';
import { apiConfig } from './api-config';
import { clog, cookieParser } from './utils';
import { Redis } from 'ioredis';
import { RedisService } from './redis-service';
import { io } from './server';
import { emits, rooms } from './utils/constants';

export interface UserInfoWithToken extends UserInfo {
  token: string;
}

const getUserInfo = async (socket: Socket): Promise<UserInfoWithToken | undefined> => {
  try {
    const cookie = cookieParser(socket.client.request.headers.cookie);
    if (cookie === undefined) return undefined;
    const token = decodeURI(cookie['auth._token.hydra']);
    const user = (await new UserControllerApi(apiConfig(token)).userControllerUserinfo(token).then(v => v.data));
    return {
      ...user,
      token,
    };
  } catch (e) {
    return undefined;
  }
};

const wsInit = (client: Redis) => {
  return async (socket: Socket) => {
    const user = await getUserInfo(socket);
    if (user === undefined) {
      socket.disconnect(true);
      return;
    }
    let record = {} as Record;
    clog(`${socket.id}|${user.name} connected`);
    const redis = new RedisService(client, user, socket);

    socket.on('disconnect', () => {
      clog(`${socket.id} disconnected`);
    });

    socket.on('Middleware/UserStateMonitor', (dat) => {
      const d = JSON.parse(dat);
      clog(user.name, JSON.parse(dat));
      redis.Tracker().update(d);
      wsBroadcast(rooms.track, emits.track.update);
    });

    const rRecorder = redis.Record();
    socket.on('MonacoEditor', (dat) => {
      const d: { type: string, value: string, event: any, time: Date } = JSON.parse(dat);
      clog(user.name, `${record.timeline.length + 1}|${d.time}|MonacoEditor/${d.type}`);
      rRecorder.update(dat);
    });

    socket.on('editor/submit', async (dat) => {
      clog(user.name, 'editor/submit');
      await rRecorder.submit(dat, '');
    });

    socket.on('editor/create', () => {
      clog(user.name, 'editor/create');
      rRecorder.update('', true);
    });

    socket.on('msg', (msg: string) => {
        clog(`${socket.id}:msg=${msg}`);
      },
    );
  };
};

export const wsBroadcast = (room: string, emit: string, msg: string = '') => {
  io.to(room).emit(emit, msg);
};
export default wsInit;
