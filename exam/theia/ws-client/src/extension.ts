import * as vscode from 'vscode';
import { StatusBar } from './status-bar';
import { WebsocketClient } from './websocket-client';
import { ACCESS_TOKEN, CommandID, EXT_BASENAME } from './shared-variables';
import { Logger } from './utils';
import { Monitor } from './monitor';

export let logger: Logger;
export let statusBar: StatusBar;
export let websocketClient: WebsocketClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const { subscriptions } = context;
  logger = new Logger(vscode.window.createOutputChannel(EXT_BASENAME));

  if (ACCESS_TOKEN === undefined) {
    logger.error('ACCESS_TOKEN is invalid,exit...');
    deactivate();
    return;
  }

  // vscode.window.showInformationMessage('Hello World from ws-client!');
  logger.debug('ACCESS_TOKEN:' + ACCESS_TOKEN);
  statusBar = StatusBar.init(subscriptions);
  websocketClient = WebsocketClient.Instance;
  new Monitor();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  subscriptions.push(vscode.commands.registerCommand(CommandID.Submit, () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
  }));

  logger.info('Congratulations, "ws-client" is now active!');
}


// this method is called when your extension is deactivated
export function deactivate() {
}
