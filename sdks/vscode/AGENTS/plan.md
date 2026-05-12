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
- Iteration 1 is finalized as of 2026-05-11. The completed spec and plan are archived under `AGENTS/archive/`.
- The current branch contributes a dedicated `opencode` View Container, places `opencode.view` under `views.opencode`, keeps readiness content as `opencode view ready`, and has manifest/E2E tests covering the baseline.
- Iteration 2 spec and plan are accepted/approved as of 2026-05-11.
- Iteration 2 is in Phase 3 implementation/review and focuses on a terminal-driven webview alternative for extension-created opencode terminals.

## Near-Term Plan

1. Implement Iteration 2 through the focused-coder / focused-code-reviewer loop.
2. Replace the placeholder Tree View with a terminal-driven `WebviewViewProvider`.
3. Preserve native terminal commands as the fast fallback path and source of truth.
4. Validate with `bun run check-types`, `bun run lint`, `bun run compile`, and `bun run test`.
5. Present reviewed implementation for user implementation approval before finalization.

## Next Session Entry

- Start with `AGENTS.md`, then read `AGENTS/workflow.md`, `AGENTS/workflow/phase-3-implementation-review.md`, `AGENTS/iteration2.spec.md`, `AGENTS/iteration2.plan.md`, and the relevant knowledge index.
- Iteration 2 implementation must stay within the accepted spec and approved plan.
- Completed Iteration 1 artifacts are archived at `AGENTS/archive/iteration1.spec.md` and `AGENTS/archive/iteration1.plan.md`.

## Proposed Iterations

### Iteration 1: Movable UI Container Baseline

- Status: Finalized / archived on 2026-05-11.
- Goal: Add a minimal opencode-contributed View Container plus View that can be moved to the Secondary Side Bar or Panel through supported VS Code layout behavior.
- Current state: `opencode.view` is contributed under dedicated `views.opencode`; dedicated `viewsContainers.activitybar` container ID `opencode` exists; manifest contract tests and E2E-style tests are present.
- Included: dedicated contribution/container shape, view naming, minimal readiness/placeholder surface, unchanged terminal behavior, documented distinction between moving the built-in Terminal view/container and moving one terminal instance.
- Excluded: full embedded web client, session sync, custom CSS system, native terminal replacement.
- User-testable outcome: the opencode container/view appears in VS Code, can be moved using layout controls, and existing terminal commands still work.
- Validation target: `bun run check-types`, `bun run lint`, `bun run compile`, `bun run test`, plus manual Extension Development Host smoke test after implementation.

### Iteration 2: Web Client Embedding Prototype

- Status: Approved / Phase 3 implementation-review.
- Goal: Make the contributed `opencode` view an alternate webview for the currently running extension-created opencode terminal.
- Included: terminal-driven placeholder/web-client states, extension-created terminal tracking, terminal-close reset, launch action through existing terminal command.
- Excluded: manually-created terminal attachment, arbitrary server discovery, guaranteed session-list sync, terminal emulation, broad state persistence.
- User-testable outcome: sidebar view shows placeholder without an extension-created terminal, renders the tracked terminal web URL while active, and returns to placeholder when that terminal closes.
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

- Can file/context injection reuse existing web deep-link mechanisms, or does the app need a new endpoint/event?
- Is custom CSS acceptable as a VS Code extension setting, or should it be an opencode app-level theme setting?

## Verification Targets

- Run from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- Manually verify in the Extension Development Host with `code sdks/vscode` and `Developer: Reload Window` after rebuilds.
- Current 2026-05-11 checks passed from `sdks/vscode`: `bun run check-types`, `bun run lint`, `bun run compile`, and `bun run test`; `bun run test` reported 6 passing tests. Lint still reports 48 semicolon warnings in `src/extension.ts`.
