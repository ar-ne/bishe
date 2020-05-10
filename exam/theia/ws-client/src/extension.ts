import * as vscode from 'vscode';
import { StatusBar } from './status-bar';
import { WebsocketClient } from './websocket-client';
import { ACCESS_TOKEN, apiConfig, CommandID, DVars, EXT_BASENAME } from './shared-variables';
import { Logger, packageFiles } from './utils';
import { FileUdControllerApi } from './generated/openapi';
import fs from 'fs';

export let logger: Logger;


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
  DVars.myStatusBarItem = new StatusBar(subscriptions);
  DVars.socket = new WebsocketClient(DVars.myStatusBarItem, ACCESS_TOKEN);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  console.log('Congratulations, "ws-client" is now active!');
  subscriptions.push(vscode.commands.registerCommand(CommandID.Submit, () => {
    // The code you place here will be executed every time your command is executed
    packageFiles();
    new FileUdControllerApi(apiConfig()).fileUdControllerFileUpload(fs.readFileSync('/tmp/answer.tar.gz'));
    // Display a message box to the user
  }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
