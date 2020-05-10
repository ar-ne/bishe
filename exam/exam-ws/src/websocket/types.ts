import { Record, UserInfo } from '../generated/openapi';
import { RedisService } from '../redis-service';
import { Socket } from 'socket.io';

export interface UserInfoWithToken extends UserInfo {
  token: string;
}

export interface WSCallback {
  event: string;
  callback: (...args: any[]) => void;
}

export interface WSCallback_ARG {
  record: Record;
  redis: RedisService;
  user: UserInfoWithToken;
  socket: Socket;
}