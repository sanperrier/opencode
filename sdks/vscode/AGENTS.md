# VS Code Extension Notes

## Scope

- Work in `sdks/vscode/`; it is a standalone extension package with its own `package.json`, `bun.lock`, `node_modules`, TypeScript config, ESLint config, and build scripts.
- Open/debug with `code sdks/vscode`, not from the repo root.
- Use the parent repo only for context unless the task explicitly crosses package boundaries.

## Agent Working Area

- Use `AGENTS/plan.md` for the current goal, plan, open questions, and verification targets.
- Use `AGENTS/knowledge/` as the scoped knowledge base. Start with `AGENTS/knowledge/index.md`, then read only the fact groups relevant to the current task.
- Use `AGENTS/workflow.md` to discover the iteration workflow. Read only the linked workflow files relevant to your role and current phase.
- Iterations follow 4 phases: accepted spec, approved plan, focused implementation/review loop with up to 3 rejection rounds, then lead finalization with user review and plan/knowledge updates.
- Every stored fact should include a trust score (`low`, `medium`, `high`) and source links to code, docs, tests, or live observations.
- Add or update knowledge when a fact is likely to prevent future agents from re-reading broad context; keep groups focused by domain.

## Commands

- Install deps from `sdks/vscode/`: `bun install`.
- Verify changes from `sdks/vscode/`: `bun run check-types`, `bun run lint`, then `bun run compile`.
- `bun run compile` runs typecheck, lint, and esbuild.
- `bun run package` runs production/minified esbuild output.
- Do not run `bun test` from the repo root; extension tests run from `sdks/vscode/` via `bun test`.

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
