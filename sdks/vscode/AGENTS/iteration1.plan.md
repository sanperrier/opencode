# Iteration 1 Plan: Movable UI Container Baseline

## Approval Status

Status: Draft, awaiting user approval before implementation.

## Spec

Source spec: [`iteration1.spec.md`](./iteration1.spec.md)

## Implementation Approach

Implement the smallest supported VS Code contribution shape that gives opencode an extension-owned movable workbench surface.

The default implementation path is a dedicated `opencode` View Container plus one `opencode.view` View. The phase 1-2 e2e contract is added before implementation and initially expects native Welcome content because it gives a manifest-visible readiness marker without assuming Webview. The view content can still be revisited if implementation discovers that Welcome content is insufficient.

- Native Welcome/Tree view if it can expose the readiness marker and prove container movement without extra runtime complexity.
- Minimal Webview View only if native Welcome/Tree content cannot satisfy the baseline or if implementation explicitly chooses real HTML for future web-client work.

Native terminal behavior stays unchanged. The built-in Terminal view/container movement is documented and manually validated as a VS Code layout capability, not reimplemented by this extension.

## Likely Files Affected

- `package.json`: add `contributes.viewsContainers`, `contributes.views`, and any necessary command/menu metadata.
- `src/extension.ts`: register the chosen view provider only if the selected view implementation requires runtime registration.
- `src/extension.test.ts`: extend integration tests for the new contribution shape and unchanged commands.
- `AGENTS/knowledge/vscode-ui-containers.md`: already added documentation summary; update if implementation discovers a correction.
- `AGENTS/knowledge/terminal-and-webview-constraints.md`: already updated terminal/container constraints; update if implementation discovers a correction.

## Implementation Tasks

1. Add phase 1-2 e2e/integration tests that assert the manifest contribution contract before implementing it.
2. Inspect VS Code contribution options against the current manifest and confirm the smallest supported view type.
3. Add a dedicated opencode View Container contribution with concise title/icon and stable ID `opencode`.
4. Add one `opencode` View contribution inside that container with stable ID `opencode.view` and visible/readiness marker `opencode view ready`.
5. If using a Webview View, register its provider in `activate()`, return a complete HTML document, use VS Code theme CSS variables, add restrictive CSP, and keep scripts disabled.
6. If using a native Tree/Welcome view, add only the minimum runtime or manifest contributions needed to expose the marker and validate the container path.
7. Preserve existing commands and terminal launch behavior exactly: `opencode.openTerminal`, `opencode.openNewTerminal`, and `opencode.addFilepathToTerminal`.
8. Add or update tests to activate the extension, validate existing commands, validate manifest contribution metadata, and validate any provider/readiness seam available through stable VS Code APIs.
9. Add a short manual validation note for moving the opencode container/view and the built-in Terminal view/container using VS Code layout behavior.

## Explicit Exclusions

- Do not embed the full opencode web client.
- Do not create a custom native Terminal container.
- Do not move a single terminal instance into the Secondary Side Bar or into the opencode container.
- Do not replace or change current terminal launch behavior.
- Do not add session sync, terminal I/O inside webview, custom CSS settings, or broad UI framework code.
- Do not add a UI automation harness in this iteration.

## Acceptance Criteria

- The extension contributes a dedicated opencode View Container using supported VS Code contribution points.
- The extension contributes a dedicated opencode View Container with stable ID `opencode` using supported VS Code contribution points.
- The extension contributes a named opencode View with stable ID `opencode.view` and user-facing label `opencode` that appears in VS Code.
- The chosen view implementation uses supported VS Code APIs and is not hard-coded by the spec to a specific view type.
- The opencode surface includes visible/readiness content matching the exact stable marker `opencode view ready`.
- If the chosen view implementation is a Webview View, it renders a complete HTML document, includes theme-aware styling using VS Code CSS variables, includes a restrictive Content Security Policy, and does not enable scripts unless there is a specific testable need.
- If the chosen view implementation is not a Webview View, the implementation plan records why that choice is smaller and sufficient for Iteration 1.
- Existing commands remain registered: `opencode.openTerminal`, `opencode.openNewTerminal`, and `opencode.addFilepathToTerminal`.
- Existing terminal behavior remains unchanged.
- No full web client embedding is introduced.
- No unsupported VS Code terminal placement workaround is introduced.
- The plan documents the distinction between moving the built-in Terminal view/container and moving a single terminal instance.
- Type checking, linting, compile, and feasible integration/e2e tests pass from `sdks/vscode`.

## Validation Commands

Run from `sdks/vscode`:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

## Automated Test Targets

- Extension activation still succeeds in the VS Code test host.
- Existing command IDs remain registered.
- Manifest includes the opencode View Container contribution.
- Manifest includes the opencode View contribution inside the expected container.
- Manifest includes native Welcome/readiness content for `opencode.view` containing `opencode view ready` for the baseline implementation path.
- If a runtime provider is needed, a stable provider/readiness seam can be verified without webview DOM inspection.

## Manual Validation Targets

- The opencode container/view appears in the Extension Development Host.
- The opencode container/view can be moved to the Secondary Side Bar or Panel using standard VS Code layout behavior.
- The built-in Terminal view/container can be moved using VS Code layout behavior, confirming that this is distinct from moving a single opencode terminal instance.
- Existing terminal commands still open/focus opencode as before.
- The opencode surface shows/readies `opencode view ready`.

## Review Focus Areas

- Confirm the implementation uses supported public VS Code contribution points and APIs.
- Confirm the chosen view type is minimal and justified.
- Confirm no terminal behavior changed accidentally.
- Confirm tests validate user-facing extension contributions rather than duplicated implementation logic.
- Confirm webview security basics if a Webview View is used.
- Confirm no unnecessary UI automation dependency was added.

## Risks And Dependencies

- VS Code does not allow extensions to contribute directly to the Secondary Side Bar by default; user movement must remain manual unless stable API/commands permit limited automation.
- Webview DOM assertions are not reliable through `@vscode/test-cli`; tests should focus on contribution/provider readiness.
- Native terminal instance placement remains constrained to VS Code's built-in terminal/editor/new-window model.
- If native Welcome/Tree view is chosen, future web-client embedding will still require a later Webview View iteration.
