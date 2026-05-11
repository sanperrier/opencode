import * as vscode from "vscode";

test('MANUAL', async () => {
    await vscode.window.showErrorMessage('When ready click "Close"', 'Close');
}).timeout(0);