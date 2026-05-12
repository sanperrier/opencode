# Iteration 2 Plan: Terminal-Driven Webview Alternative

## Approval Status

Status: Approved / locked on 2026-05-11.

The user approved this plan on 2026-05-11 by requesting implementation of the terminal-driven webview workflow plan. Implementation must stay within this locked plan unless the user approves a plan or spec change.

## Accepted Spec

- `AGENTS/iteration2.spec.md`

## Implementation Approach

Replace the current Tree View placeholder with a `WebviewViewProvider` that renders either placeholder content or an iframe-based web client shell. Track only terminals created by the extension's existing open-terminal commands. The tracked terminal owns the webview state: creating it sets the local web URL, and closing it clears the URL and refreshes the view.

The native terminal path remains the source of truth and keeps existing command behavior. The webview is an alternate display for that terminal's local server, not a replacement terminal, session browser, or independent server manager.

## Affected Files And Systems

- `src/extension.ts`: webview provider, tracked terminal state, terminal close handling, test-visible extension API.
- `src/extension.E2E.test.ts`: runtime command/view/terminal lifecycle coverage.
- `src/extension.test.ts`: manifest contract tests remain separate and may be adjusted only if the manifest contract changes.
- `package.json`: command/view contribution shape should remain stable unless a small internal command is needed for webview button wiring.
- `AGENTS/plan.md` and `AGENTS/knowledge/` may be updated after implementation/review if durable state changes.

## Implementation Tasks

1. Remove the Tree Data Provider / Tree View backing for `opencode.view`.
2. Add an `OpencodeWebviewProvider` using `vscode.window.registerWebviewViewProvider(OPENCODE_VIEW_ID, provider)`.
3. Add extension-owned state for the tracked terminal, generated port, and web URL.
4. When `opencode.openTerminal` creates a new terminal, record that terminal and `http://localhost:<port>`, then refresh the webview.
5. When `opencode.openNewTerminal` creates a new terminal, record the new terminal and URL as the active tracked terminal, then refresh the webview.
6. When `opencode.openTerminal` finds an existing opencode terminal, focus it and preserve tracked state if it is already the tracked terminal; do not attach manually-created or untracked terminals.
7. Subscribe to `vscode.window.onDidCloseTerminal`; if the closed terminal is the tracked terminal, clear tracked state and refresh the webview.
8. Render placeholder HTML when no tracked URL exists, including a button that posts a webview message to run `opencode.openTerminal`.
9. Render web-client HTML when a tracked URL exists, using an iframe or equivalent shell pointed at the tracked URL, plus minimal reload/open-terminal affordance only if needed.
10. Handle webview messages by invoking existing command paths rather than duplicating terminal launch logic.
11. Expose minimal read-only test API from `activate()` for provider mode, tracked port, tracked URL, and generated HTML or render state.
12. Preserve `opencode.addFilepathToTerminal` behavior, including `_EXTENSION_OPENCODE_PORT` handling.

## E2E Test Plan

Update runtime VS Code host tests to verify user-observable workflow through stable APIs and test-visible extension state:

- Extension activates and exposes existing commands.
- `opencode.view` can be revealed through `${OPENCODE_VIEW_ID}.open`.
- Before launch, the webview provider resolves to placeholder state.
- Running `opencode.openTerminal` creates an extension-tracked opencode terminal with a generated port and `http://localhost:<port>` URL.
- Revealing `opencode.view` after launch makes the provider render web-client state for that exact URL.
- Disposing the tracked terminal returns the provider to placeholder state.

Do not require automated webview DOM inspection; VS Code test APIs do not expose that reliably. Keep actual iframe rendering as manual validation.

## Technical Contract-Test Plan

- Keep manifest contract tests separate from E2E tests.
- Continue verifying `viewsContainers.activitybar` contains `opencode`.
- Continue verifying `views.opencode` contains `opencode.view`.
- Continue verifying `opencode.view` is not contributed only through built-in `explorer`.
- Keep or adjust `viewsWelcome` readiness coverage only if still meaningful with the webview implementation.

## Explicit Exclusions

- No manually-created terminal attachment.
- No arbitrary local opencode server discovery.
- No native terminal replacement.
- No terminal emulator or PTY bridge in the webview.
- No guaranteed session sync.
- No custom CSS, font, zoom, or styling settings.
- No new UI automation harness.
- No opencode app or server changes.

## Acceptance Criteria

- `opencode.view` remains contributed under the dedicated `opencode` View Container.
- `opencode.view` is backed by a supported `WebviewViewProvider`.
- Placeholder state appears when no extension-created opencode terminal is tracked.
- Placeholder action launches opencode through the existing terminal command path.
- Extension-created opencode terminals record generated port and web URL.
- Active tracked terminal state renders the web client URL in the webview shell.
- Closing the tracked terminal clears tracked state and refreshes placeholder state.
- Existing command IDs and terminal/file-reference behavior remain unchanged.
- Automated tests cover terminal-driven provider state and terminal-close reset.

## Validation Commands

Run from `sdks/vscode`:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

## Review Focus Areas

- The webview state is strictly terminal-driven and does not attach to manually-created terminals.
- `opencode.openTerminal` existing-terminal behavior does not accidentally claim untracked terminals.
- `opencode.openNewTerminal` deliberately updates the tracked terminal to the newly-created terminal.
- Closing only the tracked terminal resets the webview; closing unrelated terminals does not.
- E2E tests preserve user-visible intent while using provider state for stable assertions.
- Existing terminal command behavior and file-reference insertion remain unchanged.

## Risks And Dependencies

- The actual iframe render may need manual verification because test APIs cannot inspect webview DOM reliably.
- The web client may not be comfortable in narrow sidebars; styling improvements remain later work.
- If webview iframe embedding is blocked by VS Code or web app constraints, implementation must stop and escalate rather than changing scope to server/app modifications.
