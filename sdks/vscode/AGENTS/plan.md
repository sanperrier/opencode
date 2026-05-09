# Plan

## Current Goal

Improve the VS Code extension so opencode can be used effectively from VS Code, with a focus on a movable opencode-only surface that can live in the Secondary Sidebar while normal terminals stay in the standard Terminal panel.

## Current Understanding

- Native VS Code integrated terminals are fast and preferred for daily use.
- VS Code public APIs do not expose a second native Terminal container or a way to move one native terminal tab into the Secondary Sidebar.
- The web client can open the same backend session by direct URL, but may feel sluggish and may have sidebar/session-list sync issues.
- A hybrid approach is likely best: keep the terminal path as primary, and prototype a webview-based opencode surface for Secondary Sidebar usage.

## Near-Term Plan

1. Keep current terminal commands intact while exploring alternatives.
2. Prototype an optional `WebviewViewProvider`-based opencode view in `sdks/vscode`.
3. Make the webview open the correct workspace/session URL, not the active file directory.
4. Add helper commands for sending current file references to opencode.
5. Decide whether CSS/theme customization should live in the web app, the VS Code webview wrapper, or both.

## Open Questions

- Should the first webview version embed the full web app, or provide a smaller extension-owned UI that talks to the opencode server?
- Can file/context injection reuse existing web deep-link mechanisms, or does the app need a new endpoint/event?
- Is custom CSS acceptable as a VS Code extension setting, or should it be an opencode app-level theme setting?

## Verification Targets

- Run from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- Manually verify in the Extension Development Host with `code sdks/vscode` and `Developer: Reload Window` after rebuilds.
