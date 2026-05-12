import * as assert from "node:assert/strict";
import * as vscode from "vscode";

import type { activate } from "./extension";
import { EXTENSION_ID, OPENCODE_VIEW_ID } from "./config";

type ExtensionApi = ReturnType<typeof activate>;
// type TestExtensionApi = ExtensionApi & {
//   setReadyPortForTest: (port: number) => void;
//   resetReadyPortsForTest: () => void;
// };

const extension = vscode.extensions.getExtension<ExtensionApi>(EXTENSION_ID)!;

function assertViewIsPlaceholder(extensionApi: ExtensionApi) {
  const html = extensionApi.viewProvider.getHtml() ?? "";

  assert.equal(extensionApi.viewProvider.mode, "placeholder");
  assert.ok(html.includes("opencode is not running"));
}

function assertViewIsLoading(extensionApi: ExtensionApi) {
  const html = extensionApi.viewProvider.getHtml() ?? "";
  assert.equal(extensionApi.viewProvider.mode, "loading");
  assert.ok(html.includes("waiting for server"));
  assert.ok(!html.includes("<iframe"));
}

function assertViewIsWebClient(extensionApi: ExtensionApi) {
  const html = extensionApi.viewProvider.getHtml() ?? "";
  assert.equal(extensionApi.viewProvider.mode, "webClient");
  assert.ok(html.includes(`src="${extensionApi.server?.url}`));
}

suite("E2E", () => {
  setup(async function () {
    await closeAllTerminals();
    await vscode.commands.executeCommand("workbench.view.explorer");
  });

  test("exposes existing opencode commands", async function () {
    await extension.activate();

    const commands = await vscode.commands.getCommands(true);

    assert.ok(commands.includes("opencode.openTerminal"));
    assert.ok(commands.includes("opencode.openNewTerminal"));
    assert.ok(commands.includes("opencode.addFilepathToTerminal"));
  });

  test("activates extension and reveals opencode view through VS Code command API", async function () {
    const extensionApi = await extension.activate();

    assert.ok(extensionApi);

    const initialResolveCount = extensionApi.viewProvider.resolveCount;

    await vscode.commands.executeCommand(`${OPENCODE_VIEW_ID}.open`);
    await waitFor(
      () => extensionApi.viewProvider.resolveCount > initialResolveCount,
    );

    assertViewIsPlaceholder(extensionApi);
  });

  test("tracks extension-created terminal and waits for readiness before rendering web client", async function () {
    this.timeout(10_000);
    const extensionApi = await extension.activate();

    await vscode.commands.executeCommand(`${OPENCODE_VIEW_ID}.open`);
    assertViewIsPlaceholder(extensionApi);

    await vscode.commands.executeCommand("opencode.openTerminal");
    await waitFor(() => !!extensionApi.terminal);

    const terminal = extensionApi.terminal!;
    const port = extensionApi.port!;

    assertViewIsLoading(extensionApi);

    await waitFor(() => extensionApi.viewProvider.mode === "webClient");

    assert.ok(extensionApi.server?.url.includes(String(port)));
    assert.ok(extensionApi.server?.online);
    assertViewIsWebClient(extensionApi);

    terminal.dispose();
    await waitFor(() => !extensionApi.terminal);

    assert.equal(extensionApi.port, null);
    assert.equal(extensionApi.server, null);
    assertViewIsPlaceholder(extensionApi);
  });

  test("openNewTerminal replaces the tracked terminal while an opencode terminal exists", async function () {
    this.timeout(10_000);
    const extensionApi = await extension.activate();

    await vscode.commands.executeCommand("opencode.openTerminal");
    await waitFor(() => !!extensionApi.terminal);

    const firstTerminal = extensionApi.terminal!;
    const firstPort = extensionApi.port;

    assert.ok(firstTerminal);
    assert.equal(firstPort, getTerminalPort(firstTerminal));

    await vscode.commands.executeCommand("opencode.openNewTerminal");
    await waitFor(() => extensionApi.port !== firstPort);

    const secondTerminal = extensionApi.terminal!;
    const secondPort = extensionApi.port;

    assert.ok(secondTerminal);
    assert.equal(secondPort, getTerminalPort(secondTerminal));
    assert.notEqual(secondTerminal, firstTerminal);
    assert.notEqual(secondPort, firstPort);

    firstTerminal.dispose();
    await waitFor(() => !vscode.window.terminals.includes(firstTerminal));

    await waitFor(() => extensionApi.server!.online);

    assert.equal(extensionApi.terminal, secondTerminal);
    assert.equal(extensionApi.port, secondPort);

    secondTerminal.dispose();
  });

  test("closing an unrelated terminal does not reset tracked terminal state", async function () {
    this.timeout(10_000);
    const extensionApi = await extension.activate();

    await vscode.commands.executeCommand("opencode.openTerminal");
    await waitFor(() => Boolean(extensionApi.port));

    const terminal = extensionApi.terminal!;
    const port = extensionApi.port;

    assert.ok(port);

    const unrelatedTerminal = vscode.window.createTerminal("not-opencode");
    await waitFor(() => vscode.window.terminals.includes(unrelatedTerminal));

    unrelatedTerminal.dispose();
    await waitFor(() => !vscode.window.terminals.includes(unrelatedTerminal));

    assert.equal(extensionApi.terminal, terminal);
    assert.ok(
      ["loading", "webClient"].includes(extensionApi.viewProvider.mode),
    );

    terminal.dispose();
  });

  test('unrelated terminal with name "opencode" does not affect tracked terminal', async function () {
    this.timeout(10_000);
    const extensionApi = await extension.activate();

    const unrelatedTerminal = vscode.window.createTerminal("opencode");
    await waitFor(() => vscode.window.terminals.includes(unrelatedTerminal));

    assert.equal(getTerminalPort(unrelatedTerminal), undefined);
    assert.equal(extensionApi.terminal, null);
    assert.equal(extensionApi.viewProvider.mode, "placeholder");

    await vscode.commands.executeCommand("opencode.openTerminal");
    await waitFor(() => Boolean(extensionApi.terminal));

    const terminal = extensionApi.terminal!;
    const port = extensionApi.port!;

    assert.ok(terminal);
    assert.equal(extensionApi.viewProvider.mode, "loading");
    assert.notEqual(extensionApi.terminal, unrelatedTerminal);

    await vscode.commands.executeCommand(`${OPENCODE_VIEW_ID}.open`);
    await waitFor(() => extensionApi.viewProvider.mode === "webClient");

    assert.ok(extensionApi.server?.url.includes(String(port)));

    terminal.dispose();
    unrelatedTerminal.dispose();
  });
});

async function closeAllTerminals() {
  vscode.window.terminals.map((terminal) => terminal.dispose());
  await waitFor(() => vscode.window.terminals.length === 0);
}

function getTerminalPort(terminal: vscode.Terminal) {
  const terminalOptions = terminal.creationOptions;
  if (!("env" in terminalOptions)) {
    return undefined;
  }

  const port = terminalOptions.env?._EXTENSION_OPENCODE_PORT;
  return port ? Number(port) : undefined;
}

async function waitFor(assertion: () => boolean, timeout = 10_000) {
  const started = Date.now();

  while (Date.now() - started < timeout) {
    if (assertion()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  assert.ok(assertion(), "Expected condition to become true before timeout");
}
