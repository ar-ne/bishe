// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
export let myStatusBarItem: vscode.StatusBarItem;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const { subscriptions } = context;
	vscode.window.showInformationMessage('Hello World from ws-client!');
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItem.text = `Waiting`;
	myStatusBarItem.show();
	subscriptions.push(myStatusBarItem);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	console.log('Congratulations, "ws-client" is now active!');
	subscriptions.push(vscode.commands.registerCommand('ws-client.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
