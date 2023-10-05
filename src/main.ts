import { activateTranslations } from '@dans-extension/translations';
import { ExtensionContext, commands, window } from 'vscode';
export async function activate(context: ExtensionContext) {
  commands.registerCommand('dans-extension.helloWorld', () =>
    window.showInformationMessage('Hello from dans-extension')
  );
  activateTranslations(context);
}
