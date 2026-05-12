import type * as vscode from "vscode";
import { EventEmitter } from "node:events";

export interface IServer<Online extends boolean> {
  readonly url: string;
  readonly online: Online;
}
export function getIServer(port: number): IServer<false>;
export function getIServer<Online extends boolean>(
  port: number,
  online: Online,
): IServer<Online>;
export function getIServer(port: number, online = false): IServer<boolean> {
  return {
    url: `http://localhost:${port}`,
    online: online ?? false,
  };
}

export class State
  extends EventEmitter<{
    "state-will-change": [prev: BaseState, newState: BaseState];
    "state-did-change": [prev: BaseState, newState: BaseState];
    "terminal-did-open": [terminal: vscode.Terminal, port: number];
    "terminal-did-close": [terminal: vscode.Terminal, port?: number];
    "server-did-start": [
      terminal: vscode.Terminal,
      port: number,
      server: IServer<true>,
    ];
    "server-did-stop": [
      terminal: vscode.Terminal,
      port: number,
      server: IServer<false>,
    ];
    "server-ping": [statusCode: number, statusMessage: string] | [err: unknown];
    "dispose": [];
  }>
  implements Disposable
{
  public get state() {
    return this._state.type;
  }

  public get terminal() {
    return this._state.terminal;
  }

  public get port() {
    return this._state.port;
  }

  public get server() {
    return this._state.server;
  }

  constructor() {
    super();

    this._state = new NoTerminalState((newState) => {
      const oldState = this._state;
      this.unsubscribeFromState(oldState);

      this.emit("state-will-change", oldState, newState);

      this._state = newState;

      this.subscribeToState(newState);

      this.emit("state-did-change", oldState, newState);
    });
  }

  public [Symbol.dispose](): void {
    this.unsubscribeFromState(this._state);
    this._state[Symbol.dispose]();
    this.emit("dispose");
    this.removeAllListeners();
  }

  public dispose() {
    this[Symbol.dispose]();
  }

  public terminalDidOpen(terminal: vscode.Terminal, port: number) {
    this._state.onTerminalDidOpen(terminal, port);
  }

  public terminalDidClose(terminal: vscode.Terminal) {
    this._state.onTerminalDidClose(terminal);
  }

  private subscribeToState(state: BaseState) {
    state.on("terminal-did-open", this.onTerminalDidOpen);
    state.on("terminal-did-close", this.onTerminalDidClose);
    state.on("server-did-start", this.onServerDidStart);
    state.on("server-did-stop", this.onServerDidStop);
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    state.on("server-ping", this.onServerPing as any);
  }

  private unsubscribeFromState(state: BaseState) {
    state.off("terminal-did-open", this.onTerminalDidOpen);
    state.off("terminal-did-close", this.onTerminalDidClose);
    state.off("server-did-start", this.onServerDidStart);
    state.off("server-did-stop", this.onServerDidStop);
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    state.off("server-ping", this.onServerPing as any);
  }

  private onTerminalDidOpen = (terminal: vscode.Terminal, port: number) => {
    this.emit("terminal-did-open", terminal, port);
  };

  private onTerminalDidClose = (terminal: vscode.Terminal, port?: number) => {
    this.emit("terminal-did-close", terminal, port);
  };

  private onServerDidStart = (
    terminal: vscode.Terminal,
    port: number,
    server: IServer<true>,
  ) => {
    this.emit("server-did-start", terminal, port, server);
  };

  private onServerDidStop = (
    terminal: vscode.Terminal,
    port: number,
    server: IServer<false>,
  ) => {
    this.emit("server-did-stop", terminal, port, server);
  };

  private onServerPing: {
    (statusCode: number, statusMessage: string): void;
    (err: unknown): void;
  } = (
    ...args: [statusCode: number, statusMessage: string] | [err: unknown]
  ) => {
    this.emit("server-ping", ...args);
  };

  private _state: BaseState;
}
export default State;

export abstract class BaseState
  extends EventEmitter<{
    "terminal-did-open": [terminal: vscode.Terminal, port: number];
    "terminal-did-close": [terminal: vscode.Terminal, port?: number];
    "server-did-start": [
      terminal: vscode.Terminal,
      port: number,
      server: IServer<true>,
    ];
    "server-did-stop": [
      terminal: vscode.Terminal,
      port: number,
      server: IServer<false>,
    ];
    "server-ping": [statusCode: number, statusMessage: string] | [err: unknown];
  }>
  implements Disposable
{
  public type: "no-terminal" | "waiting-for-server" | "online" = "no-terminal";
  public terminal: vscode.Terminal | null = null;
  public port: number | null = null;
  public server: IServer<boolean> | null = null;

  constructor(setState: (newState: BaseState) => void) {
    super();
    this._setState = setState;
  }

  public abstract onTerminalDidOpen(
    terminal: vscode.Terminal,
    port: number,
  ): void;
  public abstract onTerminalDidClose(terminal: vscode.Terminal): void;
  public abstract onServerDidStart(
    terminal: vscode.Terminal,
    port: number,
  ): void;
  public abstract onServerDidStop(
    server: IServer<boolean> | number | string,
  ): void;

  public [Symbol.dispose]() {
    // do nothing
  }

  protected changeState(newState: BaseState) {
    this[Symbol.dispose]();
    this._setState(newState);
  }

  protected _setState: (newState: BaseState) => void;
}

export class NoTerminalState extends BaseState {
  public type = "no-terminal" as const;
  public terminal: null = null;
  public port: null = null;
  public server: null = null;

  public onTerminalDidOpen(terminal: vscode.Terminal, port: number): void {
    this.emit("terminal-did-open", terminal, port);
    this.changeState(new WaitingForServerState(this._setState, terminal, port));
  }

  public onTerminalDidClose(): void {
    // do nothing
  }

  public onServerDidStart(terminal: vscode.Terminal, port: number): void {
    this.emit("server-did-start", terminal, port, getIServer(port, true));
    this.changeState(new OnlineState(this._setState, terminal, port));
  }

  public onServerDidStop(): void {
    // do nothing
  }
}

export class WaitingForServerState extends BaseState {
  public type = "waiting-for-server" as const;
  public terminal: vscode.Terminal;
  public port: number;
  public server: IServer<false>;

  constructor(
    setState: (newState: BaseState) => void,
    terminal: vscode.Terminal,
    port: number,
  ) {
    super(setState);
    this.terminal = terminal;
    this.port = port;
    this.server = getIServer(port, false);

    this.pinger = this.startPinging();
  }

  public onTerminalDidOpen(terminal: vscode.Terminal, port: number): void {
    if (terminal === this.terminal && port === this.port) {
      return;
    }
    this.emit("terminal-did-open", terminal, port);
    this.changeState(new WaitingForServerState(this._setState, terminal, port));
  }

  public onTerminalDidClose(terminal: vscode.Terminal): void {
    if (terminal !== this.terminal) {
      return;
    }
    this.emit("terminal-did-close", terminal, this.port ?? undefined);
    this.changeState(new NoTerminalState(this._setState));
  }

  public onServerDidStart(terminal: vscode.Terminal, port: number): void {
    this.emit("server-did-start", terminal, port, getIServer(port, true));
    this.changeState(new OnlineState(this._setState, terminal, port));
  }

  public onServerDidStop(): void {
    this.emit(
      "server-did-stop",
      this.terminal,
      this.port,
      getIServer(this.port, false),
    );
    this.changeState(
      new WaitingForServerState(this._setState, this.terminal, this.port),
    );
  }

  public [Symbol.dispose](): void {
    this.pinger.abort();
    return super[Symbol.dispose]();
  }

  private startPinging() {
    const abortCtrl = new AbortController();

    void (async () => {
      while (!abortCtrl.signal.aborted) {
        const timeoutSignal = AbortSignal.timeout(2000);
        const ctrl = new AbortController();
        timeoutSignal.onabort = () => ctrl.abort();

        try {
          const res = await fetch(new URL("/global/health", this.server.url), {
            signal: ctrl.signal,
          });

          this.emit("server-ping", res.status, res.statusText);

          if (res.ok) {
            if (abortCtrl.signal.aborted) {
              return;
            }
            this.onServerDidStart(this.terminal, this.port);
            break;
          }
        } catch (err) {
          this.emit("server-ping", err);
          await new Promise((resolve) => setTimeout(resolve, 200));
          continue;
        }
      }
    })();

    return {
      abort: () => abortCtrl.abort(),
    };
  }

  private pinger: { abort: () => void };
}

export class OnlineState extends BaseState {
  public type = "online" as const;
  public terminal: vscode.Terminal;
  public port: number;
  public server: IServer<true>;

  constructor(
    setState: (newState: BaseState) => void,
    terminal: vscode.Terminal,
    port: number,
  ) {
    super(setState);
    this.terminal = terminal;
    this.port = port;
    this.server = {
      url: `http://localhost:${port}`,
      online: true,
    };
  }

  public onTerminalDidOpen(terminal: vscode.Terminal, port: number): void {
    this.emit("terminal-did-open", terminal, port);
    this.changeState(new WaitingForServerState(this._setState, terminal, port));
  }

  public onTerminalDidClose(terminal: vscode.Terminal): void {
    if (terminal !== this.terminal) {
      return;
    }
    this.emit("terminal-did-close", terminal, this.port);
    this.changeState(new NoTerminalState(this._setState));
  }

  public onServerDidStart(terminal: vscode.Terminal, port: number): void {
    if (terminal === this.terminal && port === this.port) {
      return;
    }
    this.emit("server-did-start", terminal, port, getIServer(port, true));
    this.changeState(new OnlineState(this._setState, terminal, port));
  }

  public onServerDidStop(): void {
    this.emit(
      "server-did-stop",
      this.terminal,
      this.port,
      getIServer(this.port, false),
    );
    this.changeState(
      new WaitingForServerState(this._setState, this.terminal, this.port),
    );
  }
}
