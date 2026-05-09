import * as assert from "node:assert/strict";
import * as vscode from "vscode";

suite("extension", () => {
  test("registers opencode commands", async () => {
    const extension = vscode.extensions.getExtension("sst-dev.opencode");

    assert.ok(extension, "Expected sst-dev.opencode extension to be available in the test host");

    await extension.activate();

    const commands = await vscode.commands.getCommands(true);

    assert.ok(commands.includes("opencode.openTerminal"));
    assert.ok(commands.includes("opencode.openNewTerminal"));
    assert.ok(commands.includes("opencode.addFilepathToTerminal"));
  });
});
