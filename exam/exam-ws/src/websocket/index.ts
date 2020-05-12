import { Namespace } from 'socket.io';
import { WSCallback, WSCallback_ARG } from './types';
import { io } from '../server';
import { CLIENT, FRONT, TRACK } from './rooms';

export const wsNamespaces: {
  [name: string]: {
    nsp: Namespace,
    init: (_: WSCallback_ARG) => WSCallback[]
  }
} = {
  FRONT_EXAM_WS: {
    nsp: io.of('/FRONT'),
    init: FRONT,
  },
  EXAM_WS_CLIENT: {
    nsp: io.of('/CLIENT'),
    init: CLIENT,
  },
  TRACK_WATCHER:{
    nsp:io.of('/TRACK'),
    init:TRACK
  }
};