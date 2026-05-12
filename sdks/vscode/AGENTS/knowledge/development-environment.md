# Development Environment

## Facts

### VS Code Extension Development Docs

- Trust: high
- Last verified: 2026-05-09
- Fact: VS Code extension development uses an Extension Development Host launched from VS Code with F5 or `Debug: Start Debugging`; after source changes, run `Developer: Reload Window` in the development host to reload the extension.
- Sources: VS Code docs retrieved 2026-05-09: https://code.visualstudio.com/api/get-started/your-first-extension

### VS Code Extension Tests

- Trust: high
- Last verified: 2026-05-11
- Fact: VS Code integration tests run inside an Extension Development Host through `vscode-test` / `@vscode/test-cli`; this package runs them from `sdks/vscode` with `bun run test`.
- Sources: VS Code docs retrieved 2026-05-09: https://code.visualstudio.com/api/working-with-extensions/testing-extension, [`../../.vscode-test.mjs`](../../.vscode-test.mjs), [`../../package.json`](../../package.json)

### Bundling Approach

- Trust: high
- Last verified: 2026-05-11
- Fact: This package uses esbuild to bundle `src/extension.ts` into `dist/extension.js`, excludes `vscode`, and runs TypeScript checks separately because esbuild does not type-check.
- Sources: VS Code docs retrieved 2026-05-09: https://code.visualstudio.com/api/working-with-extensions/bundling-extension, [`../../esbuild.js`](../../esbuild.js), [`../../package.json`](../../package.json)

### Local Tool Versions

- Trust: high
- Last verified: 2026-05-09
- Fact: Local tool checks from `sdks/vscode` reported Bun `1.3.13`, Node `v22.21.1`, npm `10.9.4`, and opencode CLI `1.14.41`.
- Sources: Live commands run 2026-05-09: `bun --version`, `node --version`, `npm --version`, `opencode --version`

### VS Code CLI Availability

- Trust: medium
- Last verified: 2026-05-09
- Fact: The `code` CLI is available at `/c/Users/alien/AppData/Local/Programs/Microsoft VS Code/code`, but `code --version` returned no visible version output in the bash tool session.
- Sources: Live commands run 2026-05-09: `command -v code`, `code --version`

### Local Dependencies Installed

- Trust: high
- Last verified: 2026-05-09
- Fact: `node_modules` is present and includes `@oxc-node/core`, `@vscode/test-cli`, `@vscode/test-electron`, TypeScript, esbuild, and ESLint.
- Sources: Live command run 2026-05-09: `bun pm ls @vscode/test-cli @vscode/test-electron typescript esbuild eslint`, [`../../package.json`](../../package.json)

### Current Validation Status

- Trust: high
- Last verified: 2026-05-11
- Fact: `bun run check-types`, `bun run lint`, `bun run compile`, and `bun run test` passed from `sdks/vscode`; `bun run test` reported 6 passing tests, and lint still reported 48 semicolon warnings in `src/extension.ts`.
- Sources: Live commands run 2026-05-11: `bun run check-types`, `bun run lint`, `bun run compile`, `bun run test`

### Test Configuration Status

- Trust: high
- Last verified: 2026-05-11
- Fact: `.vscode-test.mjs` configures `vscode-test` labels over bundled tests in `dist`; `bun run test` runs `vscode-test -l tests` after `compile:test` bundles `src/*.test.ts`.
- Sources: [`../../.vscode-test.mjs`](../../.vscode-test.mjs), [`../../package.json`](../../package.json), [`../../src/extension.test.ts`](../../src/extension.test.ts), [`../../esbuild.js`](../../esbuild.js)

### Baseline Integration Test

- Trust: high
- Last verified: 2026-05-11
- Fact: `src/extension.test.ts` verifies contributed opencode commands and current provider resolution; the dedicated manifest contract test for `viewsContainers.activitybar` and `views.opencode` is currently commented out.
- Sources: [`../../src/extension.test.ts`](../../src/extension.test.ts), [`../../package.json`](../../package.json)
