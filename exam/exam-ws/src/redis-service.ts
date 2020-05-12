import { strWithPrefixFactory } from './utils';
import { Redis } from 'ioredis';
import { DAY, MINUTE } from './utils/constants';
import { Record, RecordControllerApi, RecordWithRelations } from './generated/openapi';
import { apiConfig } from './api-config';
import { Socket } from 'socket.io';
import { UserInfoWithToken } from './websocket/types';


export const EXPIRE = 7 * DAY;
export const CACHE_EXPIRE = 10 * MINUTE;
const KEY_FACTORY = {
  USER_TRACKER: strWithPrefixFactory('WS__USER_TRACKER__'),
  USER_TIMELINE: strWithPrefixFactory('WS__USER_TIMELINE__'),
  SIMPLE_CACHE: strWithPrefixFactory('WS__SIMPLE_CACHE__'),
  USER_RECORD: strWithPrefixFactory('WS__USER_RECORD__'),
  USER_RECORD_LAST_TIME: strWithPrefixFactory('WS__USER_RECORD_LAST_TIME__'),
};

export class RedisService {

  constructor(
    private readonly client: Redis,
    private readonly user: UserInfoWithToken,
    private readonly socket: Socket) {
  }

  public Record() { //答题过程记录
    const self = this;
    const key = KEY_FACTORY.USER_RECORD(self.user.name);
    const lastTimeKey = KEY_FACTORY.USER_RECORD_LAST_TIME(self.user.name);
    const { client } = this;
    return {
      update: async (dat: string) => {
        let rec: RecordWithRelations;
        if (!await client.exists(key))
          rec = {
            answer: -1,
            startTime: String(new Date().getTime()),
            endTime: '',
            timeline: [],
          }; else rec = JSON.parse((await client.get(key))!);

        rec.timeline.push(dat);
        await client.set(key, JSON.stringify(rec));
      },

      submit: async (answerID: number, lastTime: string): Promise<Record | undefined> => {
        if (!await client.exists(key)) return undefined;
        const rec: RecordWithRelations = JSON.parse((await client.get(key))!);
        rec.endTime = String(new Date().getTime());
        rec.answer = answerID;
        const sRec = await new RecordControllerApi(apiConfig(self.user.token)).recordControllerCreate(rec)
          .then(v => v.data).catch((reason: string) => {
            throw new Error('Something wrong');
          });
        await client.del(key);
        return sRec;
      },
    };
  }

  public Tracker() { //用户跟踪
    const self = this;
    const key = KEY_FACTORY.USER_TRACKER(self.user.name);
    const { client } = this;
    return {
      update: async (dat: UserTracker) => {
        await client.set(key, JSON.stringify(dat));
        await client.expire(key, EXPIRE);
        await this.Timeline().update(dat);
      },
      get: async (): Promise<UserTracker | never> => {
        const exists = await client.exists(key).then(v => v === 1);
        if (exists)
          return client.get(key).then(v => JSON.parse(v!));
        return Promise.reject(`no UserTracker match given key:${key}`);
      },
    };
  }

  async getAllTracker(): Promise<TrackerTimeline[]> {
    return this.client.keys(KEY_FACTORY.USER_TRACKER()).then(v => v.map(x => JSON.parse(x)));
  }

  public Timeline() { //记录用户位置的时间线
    const self = this;
    const key = KEY_FACTORY.USER_TIMELINE(self.user.name);
    const { client } = this;
    return {
      update: async (dat: UserTracker) => {
        await this.client.rpush(key, JSON.stringify(dat));
      },
      get: async (): Promise<TrackerTimeline> => {
        const len = await client.llen(key);
        if (len > 0)
          return client.lrange(key, 0, len).then(v => v.map(x => JSON.parse(x)));
        return Promise.reject(`no TrackerTimeline match given key:${key}`);
      },
    };
  }

  simpleGetCacheProxyFactory<T>(k: string, proxyMethod: () => Promise<T>): () => Promise<T> {
    const key = KEY_FACTORY.SIMPLE_CACHE(k);
    const { client } = this;
    return async (): Promise<T> => {
      const exists = await client.exists(key).then(v => v === 1);
      if (!exists) {
        const cData = await proxyMethod();
        await client.set(key, JSON.stringify(cData));
      }
      return client.get(key).then(v => JSON.parse(v!));
    };
  };
}

export type TrackerTimeline = UserTracker[]

export interface UserTracker {
  time: string;
  action: {
    from: string;
    to: string;
  };
}
