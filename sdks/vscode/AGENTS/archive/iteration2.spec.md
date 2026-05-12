# Iteration 2 Spec: Terminal-Driven Webview Alternative

## Approval Status

Status: Accepted / locked on 2026-05-11.

The user accepted the terminal-driven webview story on 2026-05-11. The webview is an alternative view for the opencode terminal created by this extension, not a separate server discovery or session-management feature.

## Current Implementation State

- `package.json` contributes a dedicated `opencode` View Container and `opencode.view`.
- `src/extension.ts` registers a Tree Data Provider and Tree View for `opencode.view`.
- The view currently exposes readiness through `viewsWelcome` content, not an embedded web client.
- Native terminal commands remain the primary workflow:
  - `opencode.openTerminal`
  - `opencode.openNewTerminal`
  - `opencode.addFilepathToTerminal`
- `openTerminal()` creates an opencode terminal with a random port stored in `_EXTENSION_OPENCODE_PORT` and starts `opencode --port <port>`.

## Goal

Make `opencode.view` a supported VS Code webview alternative for the currently running extension-created opencode terminal. The view should mirror that terminal lifecycle: placeholder when no tracked terminal exists, web client view while the tracked terminal is active, and placeholder again when the tracked terminal closes.

## Scope Included

- Replace the current placeholder Tree/Welcome view implementation with a supported `WebviewViewProvider` for `opencode.view`.
- Track only opencode terminals created by `opencode.openTerminal` or `opencode.openNewTerminal`.
- Store the created terminal, generated port, and local web URL in extension state when launching `opencode --port <port>`.
- Render placeholder webview content when no extension-created opencode terminal is tracked.
- Include a placeholder action that launches opencode through the existing terminal command path.
- Render the web client for the tracked terminal URL while the tracked terminal is active.
- Subscribe to terminal close events and return the webview to placeholder content when the tracked terminal closes.
- Preserve existing native terminal commands and file-reference insertion behavior.
- Keep the dedicated View Container contribution shape from Iteration 1 intact.
- Add or update automated tests for activation, command availability, view reveal behavior, tracked terminal URL state, and terminal-close reset behavior.

## Scope Excluded

- Do not support manually-created terminals named `opencode` for webview attachment.
- Do not discover or attach to arbitrary running opencode servers.
- Do not replace the native VS Code integrated terminal.
- Do not implement a terminal emulator or PTY bridge inside the webview.
- Do not guarantee web client session-list synchronization.
- Do not implement full session discovery from opencode storage or APIs.
- Do not implement custom CSS, font, zoom, or styling settings.
- Do not add a new UI automation harness.
- Do not change the opencode web app or server.

## User-Visible Outcome

- The `opencode` view opens as an extension-owned webview surface.
- Before opencode is launched through this extension, the view shows placeholder content with an action to open opencode in the native terminal.
- After `opencode.openTerminal` or `opencode.openNewTerminal` creates a terminal, the view renders the local web client for that terminal's generated port.
- When the tracked terminal closes, the view returns to placeholder content.
- Users can still use the native terminal workflow exactly as before.
- Users can move the `opencode` view through standard VS Code layout behavior established in Iteration 1.

## Acceptance Criteria

- `opencode.view` remains contributed under the dedicated `opencode` View Container.
- `opencode.view` is backed by a supported `WebviewViewProvider`.
- The webview uses a restrictive Content Security Policy appropriate for its shell.
- Placeholder content is deterministic when no extension-created opencode terminal is tracked.
- The placeholder action launches opencode through the existing terminal command path.
- A terminal created by `opencode.openTerminal` or `opencode.openNewTerminal` records the generated port and web URL.
- The webview renders the tracked terminal's web URL while that terminal is active.
- Closing the tracked terminal clears the tracked state and refreshes the webview to placeholder content.
- Existing command IDs remain registered:
  - `opencode.openTerminal`
  - `opencode.openNewTerminal`
  - `opencode.addFilepathToTerminal`
- Existing terminal launch and file-reference insertion behavior remain unchanged.
- No manually-created terminal attachment, server discovery, terminal emulation, guaranteed session sync, custom styling system, or unsupported terminal placement workaround is introduced.
- Automated tests cover changed behavior where stable APIs allow it, with manual validation notes for embedded rendering and layout movement.

## E2E Behavior Scenarios

- The extension activates successfully in the VS Code test host.
- Existing opencode commands are available after activation.
- The `opencode` view can be revealed through supported VS Code behavior.
- With no extension-created opencode terminal, the provider reaches placeholder state.
- Running `opencode.openTerminal` creates a tracked terminal with a generated local web URL.
- Revealing `opencode.view` after launch reaches web-client state for the tracked terminal URL.
- Disposing the tracked terminal returns the provider to placeholder state.

Because VS Code extension tests do not expose stable webview DOM inspection, automated tests may assert provider/test-visible state and generated HTML/URL intent. Manual validation covers actual rendered webview content.

## Contract And Unit Test Expectations

- Manifest contract tests continue to enforce the dedicated `opencode` container and `opencode.view` contribution.
- Tests cover tracked terminal URL state and terminal-close reset behavior.
- Tests cover placeholder state without starting a real opencode server.
- Tests do not duplicate implementation logic or depend on arbitrary sleeps.

## Validation Expectations

Run from `sdks/vscode`:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

Manual validation should confirm:

- The `opencode` view renders placeholder content before an extension-created terminal exists.
- The placeholder action starts the existing native terminal workflow.
- The view renders the local web client for the extension-created terminal's port.
- Closing the tracked terminal returns the view to placeholder content.
- The view remains movable to the Secondary Side Bar or Panel through VS Code layout controls.

## Risks And Dependencies

- VS Code webviews may restrict iframe behavior for local web app content depending on CSP and webview behavior.
- The opencode web app may not be optimized for narrow sidebar dimensions.
- Stable automated inspection of rendered webview content is limited in the VS Code test host.

## Assumptions

- Native terminal remains the primary supported opencode workflow.
- Only extension-created opencode terminals drive the webview lifecycle.
- Closing the tracked terminal immediately resets the webview to placeholder, even if a server process somehow remains reachable.
- A direct local opencode web URL is sufficient for the prototype while the tracked terminal is active.
- The extension remains scoped to `sdks/vscode`.
- Runtime entrypoint remains `src/extension.ts`.
- Bundled output remains `dist/extension.js`.
