# VS Code Extension Package

## Facts

### Package Scope

- Trust: high
- Last verified: 2026-05-11
- Fact: `sdks/vscode` is a standalone VS Code extension package with its own manifest, lockfile, TypeScript config, ESLint config, esbuild script, and runtime source.
- Sources: [`../../package.json`](../../package.json), [`../../bun.lock`](../../bun.lock), [`../../tsconfig.json`](../../tsconfig.json), [`../../eslint.config.mjs`](../../eslint.config.mjs), [`../../esbuild.js`](../../esbuild.js), [`../../src/extension.ts`](../../src/extension.ts)

### Runtime Entrypoint

- Trust: high
- Last verified: 2026-05-11
- Fact: VS Code loads `dist/extension.js` as the extension main file, while source code lives in `src/extension.ts`.
- Sources: [`../../package.json`](../../package.json), [`../../src/extension.ts`](../../src/extension.ts)

### Build Shape

- Trust: high
- Last verified: 2026-05-11
- Fact: `esbuild.js` bundles `src/extension.ts` to `dist/extension.js` as CommonJS for Node and excludes the `vscode` module.
- Sources: [`../../esbuild.js`](../../esbuild.js)

### Verification Commands

- Trust: high
- Last verified: 2026-05-11
- Fact: The local verification sequence is `bun run check-types`, `bun run lint`, then `bun run compile` from `sdks/vscode`; `compile` already runs typecheck, lint, and esbuild.
- Sources: [`../../package.json`](../../package.json), [`../../README.md`](../../README.md)

### Debugging Workflow

- Trust: high
- Last verified: 2026-05-11
- Fact: The extension should be opened/debugged with `code sdks/vscode`, and F5 starts TypeScript and esbuild watchers.
- Sources: [`../../README.md`](../../README.md)

### Current Commands

- Trust: high
- Last verified: 2026-05-11
- Fact: The extension currently contributes `opencode.openTerminal`, `opencode.openNewTerminal`, and `opencode.addFilepathToTerminal`.
- Sources: [`../../package.json`](../../package.json), [`../../src/extension.ts`](../../src/extension.ts)
