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
- Iteration 2 is finalized as of 2026-05-12. The completed spec and plan are archived under `AGENTS/archive/`.
- The current branch contributes a dedicated `opencode` View Container, places `opencode.view` under `views.opencode`, and backs the view with a terminal-driven `WebviewViewProvider`.
- The webview shows placeholder content without an extension-created tracked terminal, renders the tracked terminal web URL while the terminal is active and reachable, and returns to placeholder when the tracked terminal closes.
- Current automated E2E coverage includes real `opencode` server readiness; this produced one observed timeout in `openNewTerminal replaces the tracked terminal while an opencode terminal exists` during final recheck. Treat this as recorded test flakiness for a future cleanup, not an Iteration 2 finalization blocker per user approval.
- Current follow-up concerns: `opencode.addFilepathToTerminal` targets the extension-tracked terminal only, output channel disposal should be tightened, and web client workspace/session attachment is deferred to the next iteration.

## Near-Term Plan

1. Use the finalized Iteration 2 webview prototype as the baseline for the next iteration.
2. Plan the next iteration around workspace/session attachment for the embedded web client, unless the user chooses E2E reliability cleanup first.
3. Clean up test flakiness by replacing broad real-server readiness waits with deterministic readiness control or narrower state assertions.
4. Decide whether `opencode.addFilepathToTerminal` should preserve active manually-created `opencode` terminal insertion behavior or remain tracked-terminal-only.
5. Keep native terminal commands as the fast fallback path and source of truth.

## Next Session Entry

- Start with `AGENTS.md`, then read `AGENTS/workflow.md`, `AGENTS/plan.md`, and the relevant knowledge index.
- Completed Iteration 1 artifacts are archived at `AGENTS/archive/iteration1.spec.md` and `AGENTS/archive/iteration1.plan.md`.
- Completed Iteration 2 artifacts are archived at `AGENTS/archive/iteration2.spec.md` and `AGENTS/archive/iteration2.plan.md`.
- Before planning the next iteration, account for the recorded E2E flakiness caused by real `opencode` server readiness waits.

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

- Status: Finalized / archived on 2026-05-12.
- Goal: Make the contributed `opencode` view an alternate webview for the currently running extension-created opencode terminal.
- Included: terminal-driven placeholder/web-client states, extension-created terminal tracking, terminal-close reset, launch action through existing terminal command.
- Excluded: manually-created terminal attachment, arbitrary server discovery, guaranteed session-list sync, terminal emulation, broad state persistence.
- User-testable outcome: sidebar view shows placeholder without an extension-created terminal, renders the tracked terminal web URL while active and reachable, and returns to placeholder when that terminal closes.
- Validation: `bun run check-types`, `bun run lint`, and `bun run compile` passed on 2026-05-12. `bun run test` passed in earlier Phase 3 review runs, then one final Phase 4 recheck observed an E2E timeout in the real-server `openNewTerminal` path; user approved recording this as future test flakiness.

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
- Should `opencode.addFilepathToTerminal` preserve active manually-created `opencode` terminal insertion behavior, or should the new tracked-terminal-only behavior become explicit?
- Should the next iteration prioritize workspace/session attachment or first remove real-server readiness flakiness from E2E tests?

## Verification Targets

- Run from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- Manually verify in the Extension Development Host with `code sdks/vscode` and `Developer: Reload Window` after rebuilds.
- Current 2026-05-12 checks passed from `sdks/vscode`: `bun run check-types`, `bun run lint`, and `bun run compile`.
- `bun run test` currently has an observed flaky failure mode when a real `opencode` server readiness path exceeds the test timeout. Future fixes should avoid broad real-server waits in automated E2E and keep actual rendered webview validation as manual smoke coverage.
