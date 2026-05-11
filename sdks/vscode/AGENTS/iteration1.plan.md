# Iteration 1 Plan: Movable UI Container Baseline

## Approval Status

Status: Approved / locked on 2026-05-11.

The user approved this plan on 2026-05-11. Implementation must stay within this locked plan unless the user approves a plan or spec change.

## Accepted Spec

- `AGENTS/iteration1.spec.md`

## Implementation Approach

Add the smallest supported VS Code contribution shape for an extension-owned opencode workbench surface:

- Contribute a dedicated Activity Bar View Container with stable ID `opencode`, title `opencode`, and an icon.
- Move the existing contributed view from the built-in `explorer` location to `views.opencode`.
- Keep the view ID `opencode.view`, view name `opencode`, and welcome/readiness marker `opencode view ready`.
- Keep the existing Tree Data Provider and Tree View implementation unless tests prove it needs a small stability adjustment.
- Preserve existing terminal commands and terminal behavior.
- Add separate contract tests for the manifest contribution shape.
- Keep E2E-style tests focused on observable extension activation, command availability, view availability, and readiness behavior.

## Affected Files And Systems

- `package.json`: VS Code contribution points for `viewsContainers`, `views`, and `viewsWelcome`.
- `src/extension.ts`: only if required to keep the existing view/provider behavior stable after moving the manifest contribution.
- [`src/extension.E2E.test.ts`](../src/extension.E2E.test.ts): E2E-style runtime VS Code host tests.
- `src/extension.test.ts`: separate manifest contract tests and existing unit-style coverage if still useful.
- Existing icon asset or a minimal new icon asset if no suitable activity bar icon exists.

## Implementation Tasks

1. Inspect the current manifest, source, tests, and available assets.
2. Add `contributes.viewsContainers.activitybar` with container ID `opencode`, title `opencode`, and icon.
3. Move `opencode.view` from `views.explorer` to `views.opencode`.
4. Preserve `viewsWelcome` content for `opencode.view` containing the exact marker `opencode view ready`.
5. Verify the existing extension activation and command registration tests still cover:
   - `opencode.openTerminal`
   - `opencode.openNewTerminal`
   - `opencode.addFilepathToTerminal`
6. Add or enable contract tests for:
   - `viewsContainers.activitybar` includes ID `opencode`.
   - `views.opencode` includes view ID `opencode.view`.
   - `viewsWelcome` for `opencode.view` contains `opencode view ready`.
   - `opencode.view` is not contributed only under built-in `explorer`.
7. Add or adjust E2E-style tests for supported observable behavior where stable VS Code APIs allow it:
   - extension activates in the VS Code test host.
   - opencode commands are available.
   - opencode view can be revealed or resolved.
   - readiness behavior is observable without asserting raw manifest shape.
8. Run validation commands from `sdks/vscode`.
9. Record manual validation notes in the implementation summary for layout movement that automated tests cannot reliably verify.

## E2E Test Plan

The E2E-style tests are drafted in [`src/extension.E2E.test.ts`](../src/extension.E2E.test.ts) as runtime VS Code host tests. The file name matches the current `esbuild.js` test entry pattern, `src/*.test.ts`.

Readiness marker coverage should not be duplicated as an E2E test unless VS Code exposes the Tree/Welcome content through a stable runtime API in the test host. Otherwise, `opencode view ready` remains covered by the manifest contract test and manual validation.

If stable VS Code APIs cannot prove Secondary Side Bar or Panel movement deterministically, leave those checks as manual validation instead of adding brittle UI automation.

Do not E2E-test raw manifest contribution shape, view-container JSON, icon paths, or whether `opencode.view` is under `views.opencode`; those are technical contract tests below.

## Technical Contract-Test Plan

Keep contract tests separate from E2E-style behavior tests. They should inspect the extension package manifest and verify:

- `contributes.viewsContainers.activitybar` contains a container with ID `opencode`, title `opencode`, and an icon.
- `contributes.views.opencode` contains a view with ID `opencode.view` and name `opencode`.
- `contributes.viewsWelcome` contains an entry for `opencode.view` whose contents include `opencode view ready`.
- `opencode.view` is not contributed only through `contributes.views.explorer`.

## Explicit Exclusions

- No native terminal replacement.
- No attempt to move one native terminal tab into the Secondary Side Bar or a custom container.
- No embedded opencode web client.
- No opencode server connection or session synchronization.
- No custom CSS, font, or styling settings.
- No terminal I/O inside a webview.
- No new UI automation harness.
- No broad formatting cleanup unless validation requires it.

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

## Validation Commands

Run from `sdks/vscode`:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

## Review Focus Areas

- Manifest contribution shape matches the accepted contract exactly.
- Existing terminal command behavior is unchanged.
- E2E-style tests remain user-visible behavior tests.
- Manifest contract tests are clearly separate from E2E-style behavior tests.
- The implementation does not introduce out-of-scope webview, server, sync, CSS, or terminal-placement workarounds.
- Validation was run from `sdks/vscode`, not the repository root.

## Risks And Dependencies

- VS Code cannot default a contributed view directly into the Secondary Side Bar; user movement remains manual.
- Automated APIs may not reliably verify layout movement, so manual validation remains part of acceptance.
- Existing lint warnings may remain if they do not block validation.
- If no existing icon asset is suitable for the Activity Bar container, a minimal icon asset will be needed.
