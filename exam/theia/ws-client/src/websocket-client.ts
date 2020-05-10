import Socket = SocketIOClient.Socket;
import { StatusBar } from './status-bar';
import io from 'socket.io-client';
import { settings } from './shared-variables';
import { logger } from './extension';
import { packageFiles } from './utils';

export class WebsocketClient {
  get wsc(): Socket {
    return this._wsc;
  }

  private readonly _wsc: Socket;

  constructor(statusBar: StatusBar, token: string) {
    this._wsc = io(`${settings.ws}/CLIENT`, {
      autoConnect: false,
      transportOptions: {
        polling: {
          extraHeaders: {
            'auth': token,
          },
        },
      },
    });
    this._wsc.connect();
    logger.info('Connecting...');
    this._wsc.on('connect', () => {
      statusBar.setState('Connected');
      logger.info(`Connected to ${settings.ws}`);
    });
    this._wsc.on('error', (err: string) => {
      logger.error(err);
    });
    this._wsc.on('disconnect', (reason: string) => {
      statusBar.setState('Failed');
      logger.error(`Disconnected ${reason}`);
    });
    this._wsc.on('reconnecting', (attempts: number) => {
      statusBar.setState(undefined, 'Reconnecting...', 'refresh~spin', '正在尝试重新连接...' + attempts);
      logger.info(`第${attempts}次，正在尝试重新连接`);
    });

    this.wsInit();
    this._wsc.connect();
  }

  wsInit() {
    const { _wsc: ws } = this;
    ws.on('submit', () => {
      logger.debug('Event submit from back')
      packageFiles();
    });
  }
}
