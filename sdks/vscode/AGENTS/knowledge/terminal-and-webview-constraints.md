# Terminal And Webview Constraints

## Facts

### Current Terminal Placement

- Trust: high
- Fact: Current `openTerminal()` creates a native VS Code integrated terminal in an editor split via `location: { viewColumn: vscode.ViewColumn.Beside, preserveFocus: false }`.
- Sources: [`../../src/extension.ts`](../../src/extension.ts)

### Native Terminal Limits

- Trust: medium
- Fact: VS Code public extension APIs allow native integrated terminals in the terminal panel or editor area, but do not expose a way to create a second native Terminal container for one extension.
- Sources: VS Code `TerminalLocation` / `ExtensionTerminalOptions` documentation checked during planning; local code uses only `createTerminal` in [`../../src/extension.ts`](../../src/extension.ts)

### Secondary Sidebar Limits

- Trust: medium
- Fact: The Secondary Sidebar hosts views, not editor tabs; public extension APIs do not expose a way to move one native terminal editor tab into the Secondary Sidebar.
- Sources: VS Code contribution point documentation checked during planning; current extension has no `views` or `viewsContainers` contributions in [`../../package.json`](../../package.json)

### Movable Extension View Path

- Trust: high
- Fact: A contributed `WebviewViewProvider` view can be moved by the user to the Secondary Sidebar, making it the supported path for an opencode-only movable surface.
- Sources: VS Code view contribution documentation checked during planning; current extension has no view provider registration in [`../../src/extension.ts`](../../src/extension.ts) and no view contribution in [`../../package.json`](../../package.json)

### True Terminal-Like Webview Tradeoff

- Trust: medium
- Fact: A faithful TUI in an extension-owned webview likely needs a terminal emulator such as xterm.js plus PTY/process bridging; this is more complex than the current native terminal integration.
- Sources: Current native terminal implementation in [`../../src/extension.ts`](../../src/extension.ts); VS Code WebviewViewProvider and Pseudoterminal docs checked during planning

### File Reference Insertion Today

- Trust: high
- Fact: `opencode.addFilepathToTerminal` only appends to the active terminal if that terminal is named `opencode`; references are `@relative/path` plus optional `#Lx` or `#Lx-y`.
- Sources: [`../../src/extension.ts`](../../src/extension.ts)
