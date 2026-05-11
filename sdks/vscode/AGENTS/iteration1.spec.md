# Iteration 1 Spec: Movable UI Container Baseline

## Approval Status

Status: Accepted by user; locked for Iteration 1 implementation.

## Iteration

Iteration 1: Movable UI Container Baseline.

## Goal

Add a minimal opencode-contributed VS Code UI container plus view that can serve as the extension-owned movable opencode surface for Side Bar, Secondary Side Bar, and Panel workflows, while preserving the native integrated terminal workflow as the primary fast path.

This iteration proves the extension can contribute a supported movable workbench surface and establishes test coverage for its contribution shape. It should not assume `WebviewViewProvider` up front; the implementation should choose the smallest supported view type that satisfies the baseline. It does not embed the full opencode web client or replace native terminal behavior.

## Scope Included

- Add a dedicated opencode View Container contribution for discoverability.
- Add a dedicated opencode View Container contribution for discoverability with stable ID `opencode`.
- Add at least one contributed opencode View with stable ID `opencode.view` and user-facing label `opencode`.
- Place the view in the opencode container by default using supported VS Code contribution points.
- Choose the smallest supported view implementation that proves the contribution/container workflow.
- Prefer native VS Code view mechanisms when enough; use a Webview View only if real HTML rendering is needed for this baseline or future-proofing.
- If a Webview View is chosen, render a complete HTML document, include basic VS Code theme-aware styling, include a restrictive Content Security Policy, and keep scripts disabled unless there is a specific automated test target.
- Include placeholder/readiness content that clearly identifies the surface as opencode and exposes the exact stable marker `opencode view ready` through the chosen view mechanism.
- Define and add phase 1-2 e2e/integration test coverage before implementation that asserts the expected container/view contribution contract.
- Verify how the built-in Terminal view/container can be moved by users and document how that affects the opencode native terminal workflow.
- Keep existing native terminal commands and behavior unchanged:
  - `opencode.openTerminal`
  - `opencode.openNewTerminal`
  - `opencode.addFilepathToTerminal`
- Add or update VS Code integration/e2e-oriented test coverage where feasible.
- Add a documented manual validation path for any view placement or webview-rendering behavior that cannot be reliably asserted through `@vscode/test-cli`.

## Scope Excluded / Non-goals

- Do not replace the native VS Code integrated terminal.
- Do not attempt to move a single native terminal instance/tab into the Secondary Side Bar or into a custom opencode container.
- Do not attempt to reimplement the built-in Terminal view/container.
- Do not require the view to be movable across all editor/workbench areas.
- Do not embed the full opencode web client.
- Do not connect to the opencode server from the webview.
- Do not implement session synchronization between terminal and sidebar view.
- Do not implement custom CSS/font settings yet.
- Do not implement terminal I/O inside the webview.
- Do not add a broad UI framework or design system.
- Do not change CLI launch behavior.
- Do not alter existing file-reference insertion behavior for `opencode.addFilepathToTerminal`.
- Do not add buttons or other interactive controls in the placeholder view unless they are necessary to verify the chosen contribution shape.
- Do not add a new UI automation harness in this iteration.

## User-visible Behavior / Outcome

After this iteration:

- Users still use the native VS Code terminal as the primary opencode workflow.
- A new opencode container/view is available in VS Code as extension-contributed UI.
- The opencode surface exposes visible/readiness content with the stable marker `opencode view ready`.
- The opencode container/view is suitable for placement in the Secondary Side Bar or Panel by the user through standard VS Code layout behavior.
- The existing native terminal workflow remains in the built-in Terminal view/editor workflows; users may move the built-in Terminal container/panel through VS Code's own layout controls.
- Automated tests validate the stable contribution/provider path where VS Code APIs allow it; Secondary Side Bar/Panel placement and painted UI content are manually validated when API-level assertions are not reliable.
- Existing opencode commands continue to work as before.

## Acceptance Criteria

- The extension contributes a dedicated opencode View Container using supported VS Code contribution points.
- The extension contributes a dedicated opencode View Container with stable ID `opencode` using supported VS Code contribution points.
- The extension contributes a named opencode View with stable ID `opencode.view` and user-facing label `opencode` that appears in VS Code.
- The chosen view implementation uses supported VS Code APIs and is not hard-coded by the spec to a specific view type.
- The opencode surface includes visible/readiness content matching the exact stable marker `opencode view ready`.
- If the chosen view implementation is a Webview View, it renders a complete HTML document, includes theme-aware styling using VS Code CSS variables, includes a restrictive Content Security Policy, and does not enable scripts unless there is a specific testable need.
- If the chosen view implementation is not a Webview View, the implementation plan records why that choice is smaller and sufficient for Iteration 1.
- The placeholder view does not include buttons or interactive controls.
- Existing commands remain registered:
  - `opencode.openTerminal`
  - `opencode.openNewTerminal`
  - `opencode.addFilepathToTerminal`
- Existing terminal behavior remains unchanged.
- No full web client embedding is introduced.
- No unsupported VS Code terminal placement workaround is introduced.
- The plan documents the distinction between moving the built-in Terminal view/container and moving a single terminal instance.
- Type checking, linting, compile, and feasible integration/e2e tests pass from `sdks/vscode`.
- Phase 1-2 e2e/integration tests exist before implementation and fail clearly until the container/view contribution is implemented.

## Validation / Testing Expectations

Run from `sdks/vscode`:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

Expected automated test coverage:

- Preserve or update the baseline command-registration integration test.
- Add a VS Code integration test that verifies the extension activates and the new container/view contribution path is available.
- Prefer feature-level validation through VS Code APIs over implementation-only tests.
- Verify that the contributed view metadata exists in the extension manifest.
- Verify the exact e2e contribution contract: `viewsContainers.activitybar` contains container ID `opencode`, `views.opencode` contains view ID `opencode.view`, and `viewsWelcome` exposes `opencode view ready` for `opencode.view` if the first implementation uses native Welcome content.
- Verify existing commands remain available after activation.
- If feasible with the available VS Code test APIs, open/focus the opencode view and verify a provider/readiness signal.
- If feasible with stable commands/APIs, ensure the Secondary Side Bar or auxiliary side bar command remains available, but do not add a new UI automation harness for layout or webview DOM assertions.
- Avoid arbitrary sleeps, `timeout(0)`, placeholder assertions, and duplicated implementation logic.

Manual validation must confirm:

- The opencode container/view appears in VS Code.
- The Secondary Side Bar can be shown if hidden.
- The opencode container/view can be placed in the Secondary Side Bar or Panel using supported VS Code layout behavior.
- The built-in Terminal view/container can be moved using VS Code layout behavior, confirming the user-facing distinction from moving a single terminal instance.
- Visible/readiness content in the opencode surface matches the expected placeholder marker `opencode view ready`.
- Existing terminal commands still behave as before.

## VS Code UI Container Investigation Notes

The full opencode web client is not part of this iteration. The contribution/container shape should keep future embedding requirements in mind without committing to Webview View unless needed.

- VS Code's movable workbench units are views, view containers, panels, editor tabs/groups, and built-in containers, not arbitrary extension-owned terminal tabs.
- The Secondary Side Bar is an auxiliary host for views; extensions cannot contribute there directly by default, but users can move views from the Primary Side Bar or Panel there.
- The Panel is also a host for View Containers and can itself be moved left, right, bottom, or top.
- Users can move the built-in Terminal view/container through VS Code's layout controls and can create terminal editors, but public extension APIs do not expose a custom native Terminal container for one extension.
- Views can contain Tree Views, Welcome Views, or Webview Views. Prefer the smallest adequate view type for the baseline.
- VS Code webviews are iframe-like isolated contexts and should use complete HTML documents.
- VS Code recommends restrictive CSP, minimal capabilities, `webview.cspSource` for local resources, and theme CSS variables.
- The opencode server UI currently uses CSP that permits app scripts, inline styles, images/fonts/media from self/data/https, `connect-src * data:`, and `wasm-unsafe-eval` for scripts.
- The opencode app uses WebSocket for terminal/PTY behavior.
- Future web-client embedding likely needs explicit decisions about CSP, networking, WebSocket access, local/remote server URLs, and whether app assets are embedded or loaded from the opencode server.

## Risks / Dependencies

- VS Code public APIs do not allow extensions to contribute views directly to the Secondary Side Bar by default.
  - Mitigation: contribute a normal VS Code View Container/View and rely on supported user layout behavior; automate only what stable commands/APIs allow.
- VS Code lets users move the built-in Terminal view/container, but not one extension-owned native terminal instance into a custom container.
  - Mitigation: keep native terminal workflow unchanged and document built-in Terminal movement separately from the opencode contributed container.
- Webview DOM/content assertions may be limited through `@vscode/test-cli`.
  - Mitigation: test provider/contribution readiness automatically and keep visible-content placement as manual validation.
- Secondary Side Bar visibility or view movement may require built-in commands whose stability should be verified during planning/implementation.
  - Mitigation: treat direct Secondary Side Bar automation as preferred but not mandatory unless a stable supported path is found.
- The placeholder UI/container is temporary.
  - Mitigation: keep it minimal, explicit, and test-oriented.
- Future opencode web client embedding may require broader CSP/networking work.
  - Mitigation: record findings but defer full integration to a later iteration.

## Assumptions

- Native terminal remains the primary supported opencode workflow.
- The new container/view surface is optional and additive.
- View Container plus View contribution points are the correct technical direction for this iteration.
- The exact view implementation type should be chosen during planning/implementation based on the smallest supported mechanism that satisfies the accepted criteria.
- The user does not require the view to be movable across all workbench/editor areas in this iteration.
- Placement in the Secondary Side Bar or Panel is a user workflow and manual validation target unless stable automation is feasible.
- No new UI automation dependency or harness is justified for Iteration 1.
- The extension remains scoped to `sdks/vscode`.
- Runtime entrypoint remains `src/extension.ts`.
- Bundled output remains `dist/extension.js`.
- Existing command identifiers remain stable.
- Tests run from `sdks/vscode`, not from the repository root.

## Open Questions

- Whether Iteration 1 should prefer a native empty/Welcome/Tree view or still use a minimal Webview View for real HTML baseline.
  - Proposed default: decide during planning based on the smallest implementation that still keeps future web-client embedding path clear.
