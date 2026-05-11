import * as assert from "node:assert/strict";
import * as vscode from "vscode";

import type { activate } from "./extension";

const EXTENSION_ID = "sst-dev.opencode";
const OPENCODE_VIEW_ID = "opencode.view";

suite("extension e2e", () => {
  test("exposes existing opencode commands", async () => {
    await getExtension().activate();

    const commands = await vscode.commands.getCommands(true);

    assert.ok(commands.includes("opencode.openTerminal"));
    assert.ok(commands.includes("opencode.openNewTerminal"));
    assert.ok(commands.includes("opencode.addFilepathToTerminal"));
  });

  test("activates extension and reveals opencode view through VS Code command API", async () => {
    const extensionApi = await getExtension().activate();

    assert.ok(extensionApi);

    await vscode.commands.executeCommand(`${OPENCODE_VIEW_ID}.open`);
    await waitFor(() => extensionApi.viewProvider.getChildrenCalled() > 0);

    assert.ok(extensionApi.viewProvider.getChildrenCalled() > 0);
  });
});

function getExtension() {
  const extension = vscode.extensions.getExtension<ReturnType<typeof activate>>(EXTENSION_ID);

  assert.ok(extension, `Expected ${EXTENSION_ID} extension to be available in the test host`);

  return extension;
}

async function waitFor(assertion: () => boolean) {
  const started = Date.now();

  while (Date.now() - started < 5_000) {
    if (assertion()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  assert.ok(assertion(), "Expected condition to become true before timeout");
}
