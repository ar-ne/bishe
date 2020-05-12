import __settings from './settings.json';
import { TokenAuth } from './utils';
import { TextDocument } from 'vscode';

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const ENABLE_TRACK: boolean = process.env.ENABLE_TRACK === '1';
export const BACKEND_URL = process.env.BACKEND_URL;
export const WS_URL = process.env.WS_URL;

export const EXT_BASENAME = 'ws-client';
export const settings = __settings;

export const Defaults = {
  Workspace: '/workspace',
  TempDir: '/tmp',
};

export const CommandID = {
  Submit: `${EXT_BASENAME}.submit`,
};

export const api = <T>(apiInstance: T): T => {
  if (BACKEND_URL)
    // @ts-ignore
    apiInstance.basePath = BACKEND_URL;
  // @ts-ignore
  apiInstance.setDefaultAuthentication(new TokenAuth(ACCESS_TOKEN!));
  return apiInstance;
};

export const ALLOWED_DOCUMENT_SCHEMES = ['file', 'untitled'];

export const isAllowedDocument = (document: TextDocument): boolean => ALLOWED_DOCUMENT_SCHEMES.includes(document.uri.scheme);

export interface RecordType {
  time: string,
  event: string,

  [key: string]: any
}