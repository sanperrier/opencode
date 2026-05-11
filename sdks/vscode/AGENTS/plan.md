# Plan

## Current Goal

Improve the VS Code extension so opencode can be used effectively from VS Code, with a focus on a movable opencode-only surface that can live in the Secondary Sidebar while normal terminals stay in the standard Terminal panel.

## Global Objective

Keep the native VS Code terminal as the fast primary opencode workflow, while adding an optional opencode surface that can live in the Secondary Sidebar for focused interaction, styling, and session visibility.

## Current Understanding

- Native VS Code integrated terminals are fast and preferred for daily use.
- VS Code public APIs do not expose a second native Terminal container or a way to move one native terminal tab into the Secondary Sidebar.
- The web client can open the same backend session by direct URL, but may feel sluggish and may have sidebar/session-list sync issues.
- A hybrid approach is likely best: keep the terminal path as primary, and prototype a webview-based opencode surface for Secondary Sidebar usage.
- Iteration 1 implemented a minimal opencode View Container/View contribution in the Activity Bar using native VS Code viewsWelcome readiness content; no webview implementation was needed for the baseline.

## Near-Term Plan

1. Set up and document a fast local development/testing workflow for the VS Code extension.
2. Start iteration 1 with a minimal opencode-contributed View Container and View that can be moved through VS Code layout controls.
3. Keep current native terminal commands intact while adding the optional container/view surface.
4. Prototype web client embedding only after the sidebar contribution shell is validated.
5. Add styling/session-awareness improvements after the sidebar/webview direction is proven useful.

## Proposed Iterations

### Iteration 1: Movable UI Container Baseline

- Status: Implemented and review-approved; automated verification passed.
- Goal: Add a minimal opencode-contributed View Container plus View that can be moved to the Secondary Side Bar or Panel through supported VS Code layout behavior.
- Included: contribution/container shape, view naming, minimal readiness/placeholder surface, unchanged terminal behavior, documented distinction between moving the built-in Terminal view/container and moving one terminal instance.
- Excluded: full embedded web client, session sync, custom CSS system, native terminal replacement.
- User-testable outcome: the opencode container/view appears in VS Code, can be moved using layout controls, and existing terminal commands still work.
- Validation: `bun run check-types`, `bun run lint`, `bun run compile`, `bun run test`, plus manual Extension Development Host smoke test.

### Iteration 2: Web Client Embedding Prototype

- Goal: Load the local opencode web client or direct session URL inside the contributed view.
- Included: server-not-running state, reuse known opencode port when available, reload/open-browser/open-terminal controls.
- Excluded: guaranteed session-list sync, terminal emulation, broad state persistence.
- User-testable outcome: sidebar view can interact with the web client when the server is running and fall back to native terminal when needed.
- Validation: local checks plus manual launch/load/reload/fallback testing.

### Iteration 3: Styling Controls

- Goal: Make the optional webview surface comfortable through styling hooks.
- Included: settings or controls for font, size, zoom, custom CSS text/file path, or compact layout where feasible.
- Excluded: brittle unsupported mutation of app internals and broad theming framework.
- User-testable outcome: styling changes apply to the sidebar surface and survive reload/reopen.
- Validation: local checks plus manual settings/reload testing.

### Iteration 4: Session Awareness And Recovery

- Goal: Make the sidebar surface aware of server/session lifecycle where feasible.
- Included: running/stale/waiting status and recovery actions like start/open terminal, reload, external URL, reconnect.
- Excluded: full session database reconstruction or unstable private APIs unless explicitly approved.
- User-testable outcome: stale/offline/running states are understandable and recoverable.
- Validation: local checks plus manual start/stop/restart recovery testing.

### Iteration 5: Polish And Documentation

- Goal: Finalize the hybrid workflow and document how to use it.
- Included: command labels, README updates, Secondary Sidebar setup, native terminal workflow, webview limitations, styling settings, troubleshooting.
- Excluded: new core features or major architecture changes.
- User-testable outcome: extension workflow is discoverable, understandable, and existing commands still work.
- Validation: local checks plus manual smoke test of commands and view.

## Open Questions

- For iteration 1, should the first view use native Welcome/Tree content or a minimal Webview View?
- Should iteration 1 add a command such as `opencode.openView`, or only contribute the container/view?
- Should the container default to the Activity Bar/Primary Side Bar or Panel contribution location?
- Is preserving current `opencode.openTerminal` behavior exactly as-is a hard acceptance criterion?
- Can file/context injection reuse existing web deep-link mechanisms, or does the app need a new endpoint/event?
- Is custom CSS acceptable as a VS Code extension setting, or should it be an opencode app-level theme setting?

## Verification Targets

- Run from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- Manually verify in the Extension Development Host with `code sdks/vscode` and `Developer: Reload Window` after rebuilds.
- Iteration 1 automated verification passed with `bun run check-types`, `bun run lint`, `bun run compile`, and `bun run test`; lint still reports existing semicolon warnings in `src/extension.ts`.
