# VS Code Extension Notes

## Scope

- Work in `sdks/vscode/`; it is a standalone extension package with its own `package.json`, `bun.lock`, `node_modules`, TypeScript config, ESLint config, and build scripts.
- Open/debug with `code sdks/vscode`, not from the repo root.
- Use the parent repo only for context unless the task explicitly crosses package boundaries.

## Agent Working Area

- Treat this file as the package entrypoint for local agent instructions. Do not rely on `AGENTS.override.md`; short-lived task context belongs in the conversation, active project direction belongs in `AGENTS/plan.md`, and durable facts belong in `AGENTS/knowledge/`.
- Use `AGENTS/plan.md` for the current goal, plan, open questions, and verification targets.
- Use `AGENTS/knowledge/` as the scoped knowledge base. Start with `AGENTS/knowledge/index.md`, then read only the fact groups relevant to the current task.
- Use `AGENTS/workflow.md` to discover the iteration workflow. Read only the linked workflow files relevant to your role and current phase.
- Use `AGENTS/agents/` for Codex project-agent handoff profiles. These are prompt templates, not executable custom agents.
- Use `AGENTS/archive/` for completed iteration specs and plans; active iteration artifacts belong in the `AGENTS/` root only while the iteration is current.
- Iterations follow 4 phases: accepted spec, approved plan, focused implementation/review loop with up to 3 rejection rounds, then lead finalization with user review and plan/knowledge updates.
- Every stored fact should include trust (`low`, `medium`, `high`), `Last verified`, one concrete claim, and source links to code, docs, tests, commands, or live observations.
- Add or update knowledge when a fact is likely to prevent future agents from re-reading broad context; keep groups focused by domain.
- Do not store current task TODOs, unapproved plans, conversation preferences, or long copied documentation in `AGENTS/knowledge/`.

## Commands

- Install deps from `sdks/vscode/`: `bun install`.
- Verify changes from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- `bun run compile` runs typecheck, lint, and esbuild.
- Run VS Code extension integration tests from `sdks/vscode/` with `bun run test`.
- Do not use `bun test` for this package; tests are Mocha tests run inside VS Code Electron via `@vscode/test-cli`.
- Test files live under `src/**/*.test.{ts,js}` and are loaded directly through `@oxc-node/core/register`; do not add a separate `out/test` compile step unless `.vscode-test.mjs` changes.
- `bun run package` runs production/minified esbuild output.

## Testing Expectations

- Main Orchestrator and iteration-lead should propose integration/e2e tests for each iteration that changes user-facing VS Code behavior.
- Iteration specs/plans should include expected test coverage in acceptance criteria and validation targets.
- focused-coder should add or update tests with implementation changes, preferring feature-level integration tests over placeholder or heavily mocked tests.
- focused-coder should avoid arbitrary sleeps, `timeout(0)`, placeholder assertions, and duplicated implementation logic in tests.
- focused-code-reviewer should verify tests cover the feature as a whole, are deterministic, run from `sdks/vscode`, and validate extension behavior through VS Code APIs where appropriate.

## Extension Shape

- Runtime entrypoint is `src/extension.ts`.
- Bundled output is `dist/extension.js`, declared as `main` in `package.json`.
- `esbuild.js` bundles `src/extension.ts` as CommonJS for Node and excludes `vscode`.
- The extension shells out to the installed `opencode` CLI and sends `opencode --port <port>` into a VS Code terminal.

## Debugging

- F5 starts `watch:tsc` and `watch:esbuild`.
- After code changes, use `Developer: Reload Window` in the debug VS Code window instead of restarting the debug session.
- Local testing requires the `opencode` CLI installed and on `PATH`.

## Terminal Integration

- Current terminal behavior lives in `src/extension.ts`.
- VS Code native integrated terminals can be created in the panel or editor area, but public APIs do not let extensions create a second native Terminal container or put one native terminal tab in the Secondary Sidebar.
- A Secondary Sidebar-movable opencode-only surface should be implemented as an extension-contributed view, likely a `WebviewViewProvider`, not as a native integrated terminal tab.
- `opencode.addFilepathToTerminal` only appends to an active terminal named `opencode`; file refs are `@relative/path` plus optional `#Lx` or `#Lx-y`.

## Release

- VS Code publish CI runs for tags matching `vscode-v*.*.*` or manual dispatch.
- Publish flow installs deps in `sdks/vscode/` and runs `./script/publish`.
- `.vscodeignore` excludes source, tests, config, `bun.lock`, and scripts; runtime assets must be bundled or not ignored.
