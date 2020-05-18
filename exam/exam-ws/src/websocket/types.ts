import { Record, UserInfo } from '../generated/openapi';
import { RedisService } from '../redis-service';
import { Socket } from 'socket.io';
import { Logger } from '../utils';

export interface UserInfoWithToken extends UserInfo {
  token: string;
}

export interface WSCallback {
  event: string;
  callback: (logger: Logger, ...args: any[]) => void;
}


export interface WSCallback_ARG {
  record: Record;
  redis: RedisService;
  user: UserInfoWithToken;
  socket: Socket;
}

export type TokenType = string