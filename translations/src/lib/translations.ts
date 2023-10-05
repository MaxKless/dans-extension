import {
  CompletionItem,
  CompletionItemKind,
  ExtensionContext,
  languages,
} from 'vscode';

export async function activateTranslations(context: ExtensionContext) {
  const translationResponse = await fetch('https://translate-api.deno.dev');
  const translations = await translationResponse.json();

  context.subscriptions.push(
    languages.registerCompletionItemProvider(
      ['typescript', 'typescriptreact'],
      {
        provideCompletionItems(document, position, token, context) {
          const line = document.lineAt(position).text;
          const preCursorText = line.substring(0, position.character);
          const match = preCursorText.match(/translate\(\s*['"]*([^'",)]*)$/);
          if (match) {
            const completionItems = Object.keys(translations).map(
              (key) => new CompletionItem(key, CompletionItemKind.Text)
            );
            return completionItems;
          }
        },
      }
    )
  );
}
