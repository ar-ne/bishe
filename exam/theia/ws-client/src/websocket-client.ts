import Socket = SocketIOClient.Socket;
import io from 'socket.io-client';
import { logger, statusBar } from './extension';
import { ACCESS_TOKEN, RecordType, WS_URL } from './shared-variables';
import { Answer } from './generated/openapi/model/answer';
import { filesUpload } from './utils';
import { Template } from './generated/openapi/model/template';

export class WebsocketClient {
  get wsc(): Socket {
    return this._wsc;
  }

  private readonly _wsc: Socket;
  private static _instance: WebsocketClient;

  static get Instance() {
    if (!WebsocketClient._instance)
      WebsocketClient._instance = new WebsocketClient();
    return WebsocketClient._instance;
  }

  private constructor() {
    this._wsc = io(`${WS_URL}/CLIENT`, {
      autoConnect: false,
      transportOptions: {
        polling: {
          extraHeaders: {
            'auth': ACCESS_TOKEN,
          },
        },
      },
    });
    this._wsc.connect();
    logger.info(`Connecting to ${WS_URL}`);
    this._wsc.on('connect', () => {
      statusBar.setState('Connected');
      logger.info(`Connected to ${WS_URL}`);
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
    ws.on('submit/answer', async ({ user, qID }: { user: string, qID: number }) => {
      logger.debug('submit/answer from back');
      const file = `answer-${new Date().getTime()}-${user}.tar.gz`;

      if (await filesUpload(file)) {
        logger.info('upload success.');
      }

      logger.debug('' + qID);
      ws.emit('submit/answer/uploaded', { file, question: qID });
      ws.on('submit/answer/done', (ansJ: string) => {
        const ans = JSON.parse(ansJ) as Answer;
        logger.debug(`提交成功：${JSON.stringify(ans, null, 2)}`);
      });
    });

    ws.on('submit/template', async ({ user, name }: { user: string, name: string }) => {
      logger.debug('submit/template from back');
      const file = `template-${new Date().getTime()}-${name}.tar.gz`;

      if (await filesUpload(file)) {
        logger.info('upload success.');
      }

      logger.debug(name);
      ws.emit('submit/template/uploaded', { file, name });
      ws.on('submit/template/done', (ansJ: string) => {
        const t = JSON.parse(ansJ) as Template;
        logger.debug(`提交成功：${JSON.stringify(t, null, 2)}`);
      });
    });

  }

  editorEvent(red: RecordType) {
    this._wsc.emit('editor/recordUpdate', JSON.stringify(red));
  }
}
