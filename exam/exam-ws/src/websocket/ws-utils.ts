import { Socket } from 'socket.io';
import { Record, UserControllerApi } from '../generated/openapi';
import { apiConfig } from '../api-config';
import { clog, cookieParser, loggerFactory } from '../utils';
import { Redis } from 'ioredis';
import { RedisService } from '../redis-service';
import { UserInfoWithToken, WSCallback, WSCallback_ARG } from './types';

export const extractUserInfo = async (socket: Socket): Promise<UserInfoWithToken | undefined> => {
  try {
    const cookie = cookieParser(socket.client.request.headers.cookie);
    const authHeader = socket.client.request.headers.auth;
    if (cookie === undefined && authHeader === undefined) return undefined;
    const token = authHeader || decodeURI(cookie!['auth._token.hydra']);
    socket.client.request.headers['token'] = token;
    const user = (await new UserControllerApi(apiConfig(token)).userControllerUserinfo(token).then(v => v.data));
    return { ...user, token };
  } catch (e) {
    return undefined;
  }
};

export const wsInit = async (
  client: Redis, socket: Socket, wsCallbacks: (_: WSCallback_ARG) => WSCallback[]) => {
  try {
    const { record, redis, user } = await connectInit(client, socket);
    wsCallbacks({ record, redis, user, socket }).forEach(value => {
      socket.on(value.event, args => {
        const logger = loggerFactory(`${user.name}${socket.nsp.name}|${value.event}`);
        logger('');
        value.callback(logger, args);
      });
    });
  } catch (e) {
    socket.disconnect(true);
    console.error(`Client ${socket.id} disconnect due to ${e}`);
  }
};

const connectInit = async (client: Redis, socket: Socket): Promise<{
  record: Record, redis: RedisService, user: UserInfoWithToken
}> => {
  clog(`Client ${socket.id} trying to connect...`);
  const user = await extractUserInfo(socket);
  if (user === undefined) {
    throw new Error('Client do not have correct token');
  }
  clog(`${socket.id}|${user.name} connected`);
  let record = {} as Record;
  const redis = new RedisService(client, user, socket);

  socket.on('disconnect', () => {
    WSClients.WSC[socket.nsp.name].remove(user.token, socket);
    clog(`${socket.id} disconnected`);
  });

  WSClients.WSC[socket.nsp.name].add(user.token, socket);
  return { record, redis, user };
};

export class WSClients {
  private constructor() {
    this._container = {
      '/FRONT': new SocketSet(),
      '/CLIENT': new SocketSet(),
      '/TRACK': new SocketSet(),
    };
  }

  private static getInstance(): WSClients {
    if (!WSClients._instance)
      WSClients._instance = new WSClients();
    return WSClients._instance;
  }

  public static get WSC() {
    return WSClients.getInstance()._container;
  }

  public static get TRACK(): SocketSet {
    return WSClients.getInstance()._container['/TRACK'];
  }

  public static get FRONT(): SocketSet {
    return WSClients.getInstance()._container['/FRONT'];
  }

  public static get CLIENT(): SocketSet {
    return WSClients.getInstance()._container['/CLIENT'];
  }

  private _container: {
    [nsp: string]: SocketSet;
  };
  private static _instance: WSClients;
}

export class SocketSet {
  private readonly _container: { [token: string]: Socket[] };

  add(token: string, socket: Socket) {
    if (!this._container[token])
      this._container[token] = [];
    this._container[token].push(socket);
  }

  remove(token: string, socket: Socket) {
    if (!this._container[token]) return;
    if (this._container[token].includes(socket))
      this._container[token] = this._container[token].filter(v => v.id !== socket.id);
    if (this._container[token].length === 0)
      delete this._container[token];
  }

  get(token?: string): Socket[] {
    if (!token) {
      const all: Socket[] = [];
      Object.keys(this._container).forEach(key => {
        all.concat(this._container[key]);
      });
      return all;
    } else
      return this._container[token];
  }

  constructor() {
    this._container = {};
  }
}