import { ExtensionContext, commands, window } from 'vscode';

export async function activate(context: ExtensionContext) {
  commands.registerCommand('dans-extension.helloWorld', () =>
    window.showInformationMessage('Hello from dans-extension')
  );
}
