# Terminal And Webview Constraints

## Facts

### Current Terminal Placement

- Trust: high
- Last verified: 2026-05-11
- Fact: Current `openTerminal()` creates a native VS Code integrated terminal in an editor split via `location: { viewColumn: vscode.ViewColumn.Beside, preserveFocus: false }`.
- Sources: [`../../src/extension.ts`](../../src/extension.ts)

### Native Terminal Limits

- Trust: high
- Last verified: 2026-05-09
- Fact: VS Code public extension APIs allow native integrated terminals in the built-in Terminal view/panel, editor area, or new window workflows, but do not expose a way to create a custom extension-owned native Terminal container or move one terminal instance into a custom extension view container.
- Sources: VS Code Terminal Basics docs, `https://code.visualstudio.com/docs/terminal/basics`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`; local code uses only `createTerminal` in [`../../src/extension.ts`](../../src/extension.ts)

### Secondary Sidebar Limits

- Trust: high
- Last verified: 2026-05-11
- Fact: The Secondary Side Bar hosts views. Extensions cannot contribute views directly to the Secondary Side Bar by default, but users can drag views from the Primary Side Bar or Panel into it. Public extension APIs do not expose a way to move one native terminal editor tab into the Secondary Side Bar.
- Sources: VS Code Sidebars UX docs, `https://code.visualstudio.com/api/ux-guidelines/sidebars`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`; current view contribution in [`../../package.json`](../../package.json)

### Movable Extension View Path

- Trust: high
- Last verified: 2026-05-11
- Fact: A contributed View inside a View Container can be moved by the user to the Secondary Side Bar, making View Containers plus Views the supported path for an extension-owned movable opencode surface. The view content may be a Tree View, Welcome View, or Webview View depending on the feature need.
- Sources: VS Code Views UX docs, `https://code.visualstudio.com/api/ux-guidelines/views`; VS Code Tree View guide, `https://code.visualstudio.com/api/extension-guides/tree-view`; current view provider and contributions in [`../../src/extension.ts`](../../src/extension.ts) and [`../../package.json`](../../package.json)

### True Terminal-Like Webview Tradeoff

- Trust: medium
- Last verified: 2026-05-09
- Fact: A faithful TUI in an extension-owned webview likely needs a terminal emulator such as xterm.js plus PTY/process bridging; this is more complex than the current native terminal integration.
- Sources: Current native terminal implementation in [`../../src/extension.ts`](../../src/extension.ts); VS Code WebviewViewProvider and Pseudoterminal docs checked during planning

### File Reference Insertion Today

- Trust: high
- Last verified: 2026-05-11
- Fact: `opencode.addFilepathToTerminal` only appends to the active terminal if that terminal is named `opencode`; references are `@relative/path` plus optional `#Lx` or `#Lx-y`.
- Sources: [`../../src/extension.ts`](../../src/extension.ts)
