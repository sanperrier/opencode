import * as vscode from "vscode";
import { writeFileSync } from "node:fs";
import type { activate } from "./extension";
import { EXTENSION_ID } from "./config";

test("MANUAL", async () => {
  const extensionApi = await getExtension().activate();
  await vscode.window.showErrorMessage('When ready click "Close"', "Close");
  writeFileSync("dump2.html", extensionApi.viewProvider.getHtml() ?? '');
}).timeout(0);

function getExtension() {
  const extension = vscode.extensions.getExtension<ReturnType<typeof activate>>(EXTENSION_ID);

  return extension!;
}