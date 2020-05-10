import { StatusBar } from './status-bar';
import { WebsocketClient } from './websocket-client';

import __settings from './settings.json';
import { Configuration } from './generated/openapi';

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const EXT_BASENAME = 'ws-client';
export const settings = __settings;
export const ENABLE_TRACK: boolean = process.env.ENABLE_TRACK == '1';
export const BACKEND_URL = process.env.BACKEND_URL;

export const Defaults = {
  Workspace: '/workspace',
  TempDir: '/tmp',
};

export const CommandID = {
  Submit: `${EXT_BASENAME}.submit`,
};

export const DVars = {
  myStatusBarItem: {} as StatusBar,
  socket: {} as WebsocketClient,
};

export const apiConfig = (): Configuration => ({
  basePath: 'http://exam-back:3000',
  baseOptions: {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  },
});

