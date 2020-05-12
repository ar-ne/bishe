import * as vscode from 'vscode';
import { api } from './shared-variables';
import { logger } from './extension';
import execa from 'execa';
import { Authentication } from './generated/openapi/model/models';
import { FileUdControllerApi } from './generated/openapi/api/fileUdControllerApi';
import { createReadStream } from 'fs';
import localVarRequest = require('request');

export const filesUpload = async (fileName: string): Promise<boolean> => {
  logger.info('prepare to upload file');
  const file = '/tmp/' + fileName;
  const pr = new SubprocessWrapper(`tar -zcvf ${file} /home/project`);
  const f = await api(new FileUdControllerApi())
    .fileUdControllerFileUpload(createReadStream(file))
    .then((value) => {
      logger.info('receive data from back,upload success');
      logger.debug(JSON.stringify(value, null, 2));
      return true;
    }).catch(reason => {
      logger.error(reason);
      return false;
    });
  return pr ? f : false;
};


export class Logger {
  constructor(private outputChannel: vscode.OutputChannel) {
  }

  info(m: string) {
    this.outputChannel.appendLine(`[INFO] ${m}`);
  }

  error(m: string) {
    this.outputChannel.appendLine(`[ERROR] ${m}`);
  }

  debug(m: string) {
    console.log(m);
    // if (settings.debug)
    //   this.outputChannel.appendLine(`[DEBUG] ${m}`);
  }
}

export default class SubprocessWrapper {
  constructor(cmd: string | string[], cwd?: string) {
    if (typeof (cmd) !== 'string')
      cmd = cmd.join(' ');
    if (cmd.length === 0) return false;
    logger.info(`Run ${cmd} ${cwd ? 'in ' + cwd : ''}`);
    try {
      execa.sync(cmd, { stdio: 'inherit', cwd: cwd ? cwd : process.cwd(), shell: true });
    } catch {
      return false;
    }
    return true;
  }
}

export class TokenAuth implements Authentication {
  public accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (requestOptions && requestOptions.headers) {
      requestOptions.headers['Authorization'] = this.accessToken;
    }
  }
}


export const getTime = () => {
  return String(new Date().getTime());
};