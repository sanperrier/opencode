# Development Environment

## Facts

### VS Code Extension Development Docs

- Trust: high
- Fact: VS Code extension development uses an Extension Development Host launched from VS Code with F5 or `Debug: Start Debugging`; after source changes, run `Developer: Reload Window` in the development host to reload the extension.
- Sources: VS Code docs retrieved 2026-05-09: https://code.visualstudio.com/api/get-started/your-first-extension

### VS Code Extension Tests

- Trust: high
- Fact: VS Code integration tests run inside an Extension Development Host through `vscode-test` / `@vscode/test-cli`; this package runs them from `sdks/vscode` with `bun run test`.
- Sources: VS Code docs retrieved 2026-05-09: https://code.visualstudio.com/api/working-with-extensions/testing-extension, [`../../.vscode-test.mjs`](../../.vscode-test.mjs), [`../../package.json`](../../package.json)

### Bundling Approach

- Trust: high
- Fact: This package uses esbuild to bundle `src/extension.ts` into `dist/extension.js`, excludes `vscode`, and runs TypeScript checks separately because esbuild does not type-check.
- Sources: VS Code docs retrieved 2026-05-09: https://code.visualstudio.com/api/working-with-extensions/bundling-extension, [`../../esbuild.js`](../../esbuild.js), [`../../package.json`](../../package.json)

### Local Tool Versions

- Trust: high
- Fact: Local tool checks from `sdks/vscode` reported Bun `1.3.13`, Node `v22.21.1`, npm `10.9.4`, and opencode CLI `1.14.41`.
- Sources: Live commands run 2026-05-09: `bun --version`, `node --version`, `npm --version`, `opencode --version`

### VS Code CLI Availability

- Trust: medium
- Fact: The `code` CLI is available at `/c/Users/alien/AppData/Local/Programs/Microsoft VS Code/code`, but `code --version` returned no visible version output in the bash tool session.
- Sources: Live commands run 2026-05-09: `command -v code`, `code --version`

### Local Dependencies Installed

- Trust: high
- Fact: `node_modules` is present and includes `@oxc-node/core`, `@vscode/test-cli`, `@vscode/test-electron`, TypeScript, esbuild, and ESLint.
- Sources: Live command run 2026-05-09: `bun pm ls @vscode/test-cli @vscode/test-electron typescript esbuild eslint`, [`../../package.json`](../../package.json)

### Current Validation Status

- Trust: high
- Fact: `bun run check-types` and `bun run compile` passed from `sdks/vscode` on 2026-05-09. `bun run lint` reported 48 existing semicolon warnings in `src/extension.ts` but no errors and exited successfully.
- Sources: Live commands run 2026-05-09: `bun run check-types`, `bun run lint`, `bun run compile`

### Test Configuration Status

- Trust: high
- Fact: `.vscode-test.mjs` configures `vscode-test` to run `src/**/*.test.{js,ts}` and load TypeScript tests through `@oxc-node/core/register`; test files should not require a separate `out/test` compile step unless the config changes.
- Sources: [`../../.vscode-test.mjs`](../../.vscode-test.mjs), [`../../package.json`](../../package.json), [`../../src/extension.test.ts`](../../src/extension.test.ts)

### Baseline Integration Test

- Trust: high
- Fact: `src/extension.test.ts` is a VS Code integration smoke test that verifies the contributed opencode commands are registered.
- Sources: [`../../src/extension.test.ts`](../../src/extension.test.ts), [`../../package.json`](../../package.json)
