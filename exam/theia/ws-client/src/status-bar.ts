import * as vscode from 'vscode';

export type StatusBarState = 'Connecting' | 'Failed' | 'Connected' | undefined

export class StatusBar {
  get statusBarItem(): vscode.StatusBarItem {
    return this._statusBarItem;
  }

  private readonly _statusBarItem: vscode.StatusBarItem;

  constructor(subscriptions: { dispose(): any }[]) {
    this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.setState('Connecting');
    subscriptions.push(this.statusBarItem);
  }

  setState(state: StatusBarState, text?: string, icon?: string, tooltip?: string) {
    let xIcon = '', xText = '', xTooltip = '';
    switch (state) {
      case 'Connecting':
        xIcon = 'refresh~spin';
        xText = 'Connecting';
        xTooltip = '正在尝试连接...';
        break;
      case 'Connected':
        xIcon = 'check';
        xText = 'Connected';
        xTooltip = '已连接至WebSocket后端';
        break;
      case 'Failed':
        xIcon = 'close';
        xText = 'Failed';
        xTooltip = '连接失败';
        break;
    }

    this._statusBarItem.text = `$(${icon || xIcon}) ${text || xText}`;
    this._statusBarItem.tooltip = tooltip || xTooltip;
    this._statusBarItem.show();
  }
}
