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
- Iteration 1 spec and plan are accepted/approved as of 2026-05-11.
- Iteration 1 implementation is present in the current branch: `package.json` contributes a dedicated `opencode` View Container, `opencode.view` now lives under `views.opencode`, readiness content remains `opencode view ready`, and manifest/E2E tests cover the baseline.
- The implementation is ready for validation and finalization review.

## Near-Term Plan

1. Validate the current Iteration 1 implementation from `sdks/vscode`.
2. Perform lead-level finalization review against the accepted spec and approved plan.
3. Present Iteration 1 for user finalization review.
4. After user finalization approval, update durable knowledge if needed and move to Iteration 2 planning.
5. Prototype web client embedding only after the sidebar contribution shell is validated and finalized.

## Next Session Entry

- Start with `AGENTS.md`, then read `AGENTS/workflow.md`, `AGENTS/workflow/phase-4-finalization.md`, `AGENTS/iteration1.spec.md`, `AGENTS/iteration1.plan.md`, and the relevant knowledge index.
- Iteration 1 implementation is present and should be validated/finalized, not replanned, unless the user changes scope.
- Do not move to Iteration 2 implementation until Iteration 1 finalization review is complete.

## Proposed Iterations

### Iteration 1: Movable UI Container Baseline

- Status: Implemented / validation passed / pending user finalization review.
- Goal: Add a minimal opencode-contributed View Container plus View that can be moved to the Secondary Side Bar or Panel through supported VS Code layout behavior.
- Current state: `opencode.view` is contributed under dedicated `views.opencode`; dedicated `viewsContainers.activitybar` container ID `opencode` exists; manifest contract tests and E2E-style tests are present.
- Included: dedicated contribution/container shape, view naming, minimal readiness/placeholder surface, unchanged terminal behavior, documented distinction between moving the built-in Terminal view/container and moving one terminal instance.
- Excluded: full embedded web client, session sync, custom CSS system, native terminal replacement.
- User-testable outcome: the opencode container/view appears in VS Code, can be moved using layout controls, and existing terminal commands still work.
- Validation target: `bun run check-types`, `bun run lint`, `bun run compile`, `bun run test`, plus manual Extension Development Host smoke test after implementation.

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

- Can file/context injection reuse existing web deep-link mechanisms, or does the app need a new endpoint/event?
- Is custom CSS acceptable as a VS Code extension setting, or should it be an opencode app-level theme setting?

## Verification Targets

- Run from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- Manually verify in the Extension Development Host with `code sdks/vscode` and `Developer: Reload Window` after rebuilds.
- Current 2026-05-11 checks passed from `sdks/vscode`: `bun run check-types`, `bun run lint`, `bun run compile`, and `bun run test`; `bun run test` reported 6 passing tests. Lint still reports 48 semicolon warnings in `src/extension.ts`.
