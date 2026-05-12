import * as vscode from "vscode";
import { OPENCODE_VIEW_ID } from "./config";
import State from "./state";

const TERMINAL_NAME = "opencode";

export function activate(context: vscode.ExtensionContext) {
  const logger = vscode.window.createOutputChannel("opencode", { log: true });

  const state = new State();
  state.on("state-will-change", (prev, next) =>
    logger.debug(`State will change: ${prev.type} -> ${next.type}`),
  );
  state.on("state-did-change", (prev, current) =>
    logger.info(`State did change: ${prev.type} -> ${current.type}`),
  );
  state.on("terminal-did-open", (terminal, port) =>
    logger.info(`Terminal did open: ${terminal.name} with port ${port}`),
  );
  state.on("terminal-did-close", (terminal, port) =>
    logger.info(`Terminal did close: ${terminal.name} with port ${port}`),
  );
  state.on("server-did-start", (terminal, port, server) =>
    logger.info(
      `Server did start: ${server.url} on terminal ${terminal.name} with port ${port}`,
    ),
  );
  state.on("server-did-stop", (terminal, port, server) =>
    logger.info(
      `Server did stop: ${server.url} on terminal ${terminal.name} with port ${port}`,
    ),
  );
  state.on("server-ping", (...args) => logger.debug(`Server ping:`, ...args));

  const opencodeViewProvider = new OpencodeWebviewProvider(state);
  const opencodeViewDisposable = vscode.window.registerWebviewViewProvider(
    OPENCODE_VIEW_ID,
    opencodeViewProvider,
  );

  const openNewTerminalDisposable = vscode.commands.registerCommand(
    "opencode.openNewTerminal",
    async () => {
      await createOpencodeTerminal();
    },
  );

  const openTerminalDisposable = vscode.commands.registerCommand(
    "opencode.openTerminal",
    async () => {
      const existingTerminal = state.terminal;
      if (existingTerminal) {
        existingTerminal.show();
        return;
      }

      await createOpencodeTerminal();
    },
  );

  const addFilepathDisposable = vscode.commands.registerCommand(
    "opencode.addFilepathToTerminal",
    async () => {
      const fileRef = getActiveFile();
      if (!fileRef) {
        return;
      }

      if (!state.terminal) {
        return;
      }

      if (state.server?.online) {
        await appendPrompt(state.server.url, fileRef);
      } else {
        state.terminal.sendText(fileRef, false);
      }
      state.terminal.show();
    },
  );

  const closeTerminalDisposable = vscode.window.onDidCloseTerminal(
    (terminal) => {
      if (terminal !== state.terminal) {
        return;
      }

      state.terminalDidClose(terminal);
    },
  );

  context.subscriptions.push(
    opencodeViewDisposable,
    openNewTerminalDisposable,
    openTerminalDisposable,
    addFilepathDisposable,
    closeTerminalDisposable,
    logger, state,
  );

  async function createOpencodeTerminal() {
    // Create a new terminal in split screen
    const port = Math.floor(Math.random() * (65535 - 16384 + 1)) + 16384;
    const terminal = vscode.window.createTerminal({
      name: TERMINAL_NAME,
      iconPath: {
        light: vscode.Uri.file(
          context.asAbsolutePath("images/button-dark.svg"),
        ),
        dark: vscode.Uri.file(
          context.asAbsolutePath("images/button-light.svg"),
        ),
      },
      location: {
        viewColumn: vscode.ViewColumn.Beside,
        preserveFocus: false,
      },
      env: {
        _EXTENSION_OPENCODE_PORT: port.toString(),
        OPENCODE_CALLER: "vscode",
      },
    });

    state.terminalDidOpen(terminal, port);

    terminal.show();
    terminal.sendText(`opencode --port ${port}`);
  }

  async function appendPrompt(serverUrl: string, text: string) {
    await fetch(new URL(`/tui/append-prompt`, serverUrl).toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  }

  function getActiveFile(): string | undefined {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      return undefined;
    }

    const document = activeEditor.document;
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!workspaceFolder) {
      return undefined;
    }

    // Get the relative path from workspace root
    const relativePath = vscode.workspace.asRelativePath(document.uri);
    let filepathWithAt = `@${relativePath}`;

    // Check if there's a selection and add line numbers
    const selection = activeEditor.selection;
    if (!selection.isEmpty) {
      // Convert to 1-based line numbers
      const startLine = selection.start.line + 1;
      const endLine = selection.end.line + 1;

      if (startLine === endLine) {
        // Single line selection
        filepathWithAt += `#L${startLine}`;
      } else {
        // Multi-line selection
        filepathWithAt += `#L${startLine}-${endLine}`;
      }
    }

    return filepathWithAt;
  }

  const extensionApi = {
    viewProvider: {
      get mode() {
        return opencodeViewProvider.mode;
      },
      get resolveCount() {
        return opencodeViewProvider.resolveCount;
      },
      get renderCount() {
        return opencodeViewProvider.renderCount;
      },
      getHtml: () => opencodeViewProvider.webviewView?.webview.html,
    },
    get terminal() {
      return state.terminal;
    },
    get port() {
      return state.port;
    },
    get server() {
      return state.server;
    },
  };

  return extensionApi;
}

export function deactivate() {}

class OpencodeWebviewProvider implements vscode.WebviewViewProvider {
  public get mode() {
    return this._mode;
  }
  public get webviewView(): vscode.WebviewView | undefined {
    return this._webviewView;
  }
  public readonly state: State;
  public get renderCount() {
    return this._renderCount;
  }
  public get resolveCount() {
    return this._resolveCount;
  }

  constructor(state: State) {
    this.state = state;
    this.refresh();

    this.state.on("state-did-change", this.refresh.bind(this));
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._resolveCount++;
    this._webviewView = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
    };
    webviewView.webview.onDidReceiveMessage(async (message: WebviewMessage) => {
      if (message.command !== "openTerminal") {
        return;
      }

      await vscode.commands.executeCommand("opencode.openTerminal");
    });
    this.refresh();
  }

  refresh() {
    if (!this.webviewView) {
      return;
    }

    this._renderCount++;

    switch (this.state.state) {
      case "no-terminal":
        this._mode = "placeholder";
        this.webviewView.webview.html = this.renderPlaceholder();
        return;
      case "waiting-for-server":
        this._mode = "loading";
        this.webviewView.webview.html = this.renderLoading();
        break;
      case "online":
        this._mode = "webClient";
        this.webviewView.webview.html = this.renderWebClient(
          this.state.server!.url,
        );
        break;
    }
  }

  private renderPlaceholder() {
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <title>opencode</title>
  <style>
    body { align-items: center; background: transparent; color: var(--vscode-foreground); display: flex; font-family: var(--vscode-font-family); height: 100vh; justify-content: center; margin: 0; }
    main { box-sizing: border-box; max-width: 28rem; padding: 1.5rem; text-align: center; }
    h1 { font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem; }
    p { color: var(--vscode-descriptionForeground); line-height: 1.4; margin: 0 0 1rem; }
    button { background: var(--vscode-button-background); border: 0; border-radius: 2px; color: var(--vscode-button-foreground); cursor: pointer; font: inherit; padding: 0.45rem 0.75rem; }
    button:hover { background: var(--vscode-button-hoverBackground); }
  </style>
</head>
<body>
  <main>
    <h1>opencode is not running</h1>
    <p>Open opencode in the integrated terminal to show the web client here.</p>
    <button type="button" id="open-terminal">Open opencode</button>
  </main>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    document.getElementById("open-terminal").addEventListener("click", () => {
      vscode.postMessage({ command: "openTerminal" });
    });
  </script>
</body>
</html>`;
  }

  private renderLoading() {
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <title>opencode</title>
  <style>
    body { align-items: center; background: transparent; color: var(--vscode-foreground); display: flex; font-family: var(--vscode-font-family); height: 100vh; justify-content: center; margin: 0; }
    main { box-sizing: border-box; max-width: 28rem; padding: 1.5rem; text-align: center; }
    h1 { font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem; }
    p { color: var(--vscode-descriptionForeground); line-height: 1.4; margin: 0 0 1rem; }
    button { background: var(--vscode-button-background); border: 0; border-radius: 2px; color: var(--vscode-button-foreground); cursor: pointer; font: inherit; padding: 0.45rem 0.75rem; }
    button:hover { background: var(--vscode-button-hoverBackground); }
  </style>
</head>
<body>
  <main>
    <h1>waiting for server at ${this.state.server?.url ?? ""}...</h1>
    <p>Check opencode terminal for more details.</p>
    <button type="button" id="open-terminal">Check terminal</button>
  </main>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    document.getElementById("open-terminal").addEventListener("click", () => {
      vscode.postMessage({ command: "openTerminal" });
    });
  </script>
</body>
</html>`;
  }

  private renderWebClient(url: string) {
    const webClientUrl = new URL(url);
    if (!webClientUrl.href) {
      throw new Error(`Unexpected opencode web client URL: ${url}`);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${webClientUrl.origin}; style-src 'unsafe-inline';">
  <title>opencode</title>
  <style>
    body { margin: 0; padding: 0; overflow: hidden; }
    iframe { border: 0; height: 100vh; width: 100vw; }
  </style>
</head>
<body>
  <iframe title="opencode" src="${webClientUrl.href}"></iframe>
</body>
</html>`;
  }

  private _mode: "placeholder" | "loading" | "webClient" = "placeholder";
  private _webviewView: vscode.WebviewView | undefined;
  private _resolveCount = 0;
  private _renderCount = 0;
}

type WebviewMessage = {
  command?: string;
};

function getNonce() {
  return Array.from({ length: 32 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62),
    ),
  ).join("");
}
