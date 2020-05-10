import * as vscode from 'vscode';
import { settings } from './shared-variables';
import { logger } from './extension';
import execa from 'execa';

export const packageFiles = () => {
  new SubprocessWrapper('tar -zcvf /tmp/answer.tar.gz /home/project');
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
    if (settings.debug)
      this.outputChannel.appendLine(`[DEBUG] ${m}`);
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
