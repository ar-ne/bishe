import * as vscode from 'vscode';
import { TextDocumentContentChangeEvent } from 'vscode';
import { logger, websocketClient } from './extension';
import { ENABLE_TRACK, isAllowedDocument } from './shared-variables';
import { getTime } from './utils';

export class Monitor {

  constructor() {
    this.registerListeners();
  }

  registerListeners() {
    if (!ENABLE_TRACK) return;
    vscode.window.onDidChangeActiveTextEditor(e => {
      if (e === undefined) {
        logger.debug('onDidChangeActiveTextEditor: e is undefined');
        return;
      }

      const { scheme, fsPath: file } = e.document.uri;
      if (isAllowedDocument(e.document)) {
        logger.debug(`onDidChangeActiveTextEditor: scheme=${scheme} file=${file}`);
        websocketClient.editorEvent({
          time: getTime(),
          event: 'onDidChangeActiveTextEditor',
          uri: e.document.uri.toString(true),
        });
      }
    });
    vscode.workspace.onDidChangeTextDocument(e => {
      if (isAllowedDocument(e.document) && e.contentChanges.length !== 0) {
        logger.info(`onDidChangeTextDocument: content=\n${JSON.stringify(e.contentChanges, null, 2)}`);
        const jsonC = JSON.stringify(e.contentChanges);
        const uJson = JSON.parse(jsonC) as TextDocumentContentChangeEvent[];
        logger.debug(JSON.stringify(uJson[0].range.start));
        websocketClient.editorEvent({
          event: 'onDidChangeTextDocument',
          time: getTime(),
          changes: e.contentChanges,
          document: e.document,
        });
      }
    });
  }
}