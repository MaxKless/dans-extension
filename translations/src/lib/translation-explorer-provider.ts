import {
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from 'vscode';

export class TranslationExplorerProvider implements TreeDataProvider<TreeItem> {
  constructor(private translations: Record<string, Record<string, string>>) {}

  getTreeItem(element: TreeItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem): ProviderResult<TreeItem[]> {
    if (!element) {
      return Object.keys(this.translations).map((key) => {
        const treeItem = new TreeItem(key, TreeItemCollapsibleState.Collapsed);
        treeItem.contextValue = 'category';
        treeItem.iconPath = new ThemeIcon('folder');
        return treeItem;
      });
    }

    if (element.contextValue === 'category') {
      const categoryName = element.label.toString();
      const keys = Object.keys(this.translations[categoryName]);
      return keys.map((key) => {
        const treeItem = new TreeItem(key, TreeItemCollapsibleState.Collapsed);
        treeItem.contextValue = categoryName;
        treeItem.iconPath = new ThemeIcon('key');
        return treeItem;
      });
    }

    const categoryName = element.contextValue;
    const key = element.label.toString();
    return [
      new TreeItem(
        this.translations[categoryName][key],
        TreeItemCollapsibleState.None
      ),
    ];
  }
}
