# Iteration 1 Spec: Movable UI Container Baseline

## Approval Status

Status: Draft / reopened for Phase 1 on 2026-05-11.

This spec is not accepted or locked. The previous Iteration 1 artifact was reopened because the current implementation does not satisfy the dedicated `opencode` View Container contract.

## Current Implementation State

- `package.json` currently contributes `opencode.view` under the built-in `explorer` view location.
- `package.json` currently defines `viewsWelcome` content containing `opencode view ready`.
- `package.json` currently does not define `contributes.viewsContainers.activitybar` with a dedicated container ID `opencode`.
- `src/extension.ts` registers a Tree Data Provider for `opencode.view` and creates a Tree View for the same ID.
- `src/extension.test.ts` verifies command registration and provider resolution.
- `src/extension.test.ts` has the manifest contract test for the dedicated container/view shape commented out.
- Validation on 2026-05-11: `bun run check-types`, `bun run lint`, `bun run compile`, and `bun run test` passed with escalated filesystem access; lint still reports 48 semicolon warnings in `src/extension.ts`.

## Goal

Add a minimal opencode-contributed VS Code UI container plus view that can serve as the extension-owned movable opencode surface for Side Bar, Secondary Side Bar, and Panel workflows, while preserving the native integrated terminal workflow as the primary fast path.

This iteration proves the extension can contribute a supported movable workbench surface and establishes enforceable test coverage for its contribution shape. It does not embed the full opencode web client, implement session synchronization, or replace native terminal behavior.

## Scope Included

- Add a dedicated opencode View Container contribution with stable ID `opencode`.
- Add one contributed opencode View with stable ID `opencode.view` and user-facing label `opencode`.
- Place `opencode.view` in the dedicated `opencode` container by default using supported VS Code contribution points.
- Use the smallest supported view implementation that satisfies the baseline; a native Tree/Welcome view is acceptable if it exposes the readiness marker.
- Include placeholder/readiness content with exact marker `opencode view ready`.
- Preserve existing native terminal commands and behavior:
  - `opencode.openTerminal`
  - `opencode.openNewTerminal`
  - `opencode.addFilepathToTerminal`
- Define E2E behavior tests for user-visible activation, command availability, view availability, and readiness behavior.
- Add separate automated contract tests that enforce the manifest contribution contract instead of leaving those assertions commented out.
- Document manual validation for view placement/movement behavior that is not reliably covered by VS Code test APIs.

## Scope Excluded

- Do not replace the native VS Code integrated terminal.
- Do not move a single native terminal instance/tab into the Secondary Side Bar or into a custom opencode container.
- Do not embed the full opencode web client.
- Do not connect to the opencode server from the view.
- Do not implement session synchronization between terminal and sidebar view.
- Do not implement custom CSS/font settings.
- Do not implement terminal I/O inside a webview.
- Do not add a new UI automation harness.
- Do not perform broad formatting cleanup unless required for validation.

## User-Visible Outcome

- Users still use the native VS Code terminal as the primary opencode workflow.
- A dedicated opencode container/view is available as extension-contributed UI.
- The opencode view exposes readiness content with the exact marker `opencode view ready`.
- The opencode container/view can be moved by the user through standard VS Code layout behavior, including to the Secondary Side Bar or Panel where supported.
- Existing terminal commands continue to work as before.

## Acceptance Criteria

- `package.json` contributes `viewsContainers.activitybar` containing a container with ID `opencode`, title `opencode`, and an icon.
- `package.json` contributes `views.opencode` containing a view with ID `opencode.view` and name `opencode`.
- `package.json` contributes `viewsWelcome` for `opencode.view` containing exact text `opencode view ready`.
- `opencode.view` is not contributed only under the built-in `explorer` location.
- The chosen view implementation uses supported VS Code APIs.
- Existing command IDs remain registered:
  - `opencode.openTerminal`
  - `opencode.openNewTerminal`
  - `opencode.addFilepathToTerminal`
- Existing terminal launch and file-reference insertion behavior remain unchanged.
- No web client embedding, session sync, custom terminal container, or unsupported terminal placement workaround is introduced.
- E2E tests verify user-visible behavior without asserting internal implementation details.
- Contract tests enforce the dedicated container/view manifest contract.
- Manual validation notes cover Secondary Side Bar/Panel movement and visible readiness content.

## Validation Expectations

Run from `sdks/vscode`:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

## E2E Behavior Scenarios

The E2E tests for this iteration should verify functionality that a user or VS Code host can observe:

- The extension activates successfully in the VS Code test host.
- The existing opencode commands are available and can be invoked through supported VS Code behavior.
- The opencode view can be opened or revealed through supported VS Code behavior.
- The opencode view exposes readiness behavior with exact marker `opencode view ready` through stable observable behavior.

E2E tests should not assert the raw `package.json` contribution shape, internal provider implementation, helper names, file layout, or other technical details. If stable APIs cannot observe a behavior reliably, capture it as manual validation instead of encoding a brittle E2E assertion.

## Contract Test Expectations

Contract tests should verify non-user-visible technical requirements that are still part of the accepted spec:

- Manifest includes `viewsContainers.activitybar` container ID `opencode`.
- Manifest includes `views.opencode` view ID `opencode.view`.
- Manifest includes `viewsWelcome` content for `opencode.view` containing `opencode view ready`.

Contract tests must remain separate from E2E tests so implementation details do not leak into user-behavior coverage.

Manual validation should confirm:

- The opencode container/view appears in the Extension Development Host.
- The opencode container/view can be moved to the Secondary Side Bar or Panel through standard VS Code layout controls.
- The built-in Terminal view/container movement remains distinct from moving one terminal instance.
- Existing terminal commands still behave as before.

## Risks And Dependencies

- VS Code public APIs do not allow extensions to contribute directly to the Secondary Side Bar by default; user movement remains a manual workflow.
- Webview DOM/content assertions are out of scope because Iteration 1 should not require a Webview View.
- Existing test/provider behavior may need a stable readiness check to replace the current sleep-based test.
- Lint currently reports semicolon warnings but exits successfully; warning cleanup is not part of this iteration unless it blocks validation.

## Assumptions

- Native terminal remains the primary supported opencode workflow.
- A dedicated View Container plus View remains the intended technical direction.
- The user wants Iteration 1 reopened from Phase 1 before approving any revised plan.
- The extension remains scoped to `sdks/vscode`.
- Runtime entrypoint remains `src/extension.ts`.
- Bundled output remains `dist/extension.js`.
