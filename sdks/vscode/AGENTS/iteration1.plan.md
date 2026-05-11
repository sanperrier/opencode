# Iteration 1 Plan: Movable UI Container Baseline

## Approval Status

Status: Invalidated / pending new approval.

This plan is retained only as historical reference. Do not implement from this plan until the reopened Iteration 1 spec is accepted and a new Phase 2 plan is approved.

## Why This Plan Was Invalidated

- The previous implementation did not add a dedicated `opencode` View Container.
- The current view is contributed under built-in `explorer`, which does not satisfy the accepted contract for `views.opencode`.
- The manifest contract test that would enforce the dedicated container/view shape is commented out.
- Iteration 1 was archived and marked complete before reviewer approval, lead finalization, and user review were complete.

## Required Next Step

Return to Phase 1 using `AGENTS/iteration1.spec.md`.

After the user accepts the reopened spec:

- Create a new approved implementation plan.
- Include exact files/systems to edit.
- Include automated manifest contract tests as required work.
- Include manual validation targets for Secondary Side Bar/Panel movement.
- Do not delegate implementation until the new plan is approved.

## Current Source Truth

- `package.json`: contributes `opencode.view` under `explorer`; no dedicated `viewsContainers.activitybar` entry exists.
- `src/extension.ts`: registers a Tree Data Provider and Tree View for `opencode.view`.
- `src/extension.test.ts`: command/provider tests are active; dedicated manifest contract test is commented out.
- `.vscode-test.mjs`: defines `tests` and `manual` labels over bundled `dist` tests.

## Historical Validation

On 2026-05-11, the following passed from `sdks/vscode` with escalated filesystem access:

- `bun run check-types`
- `bun run lint`
- `bun run compile`
- `bun run test`

Lint still reported 48 semicolon warnings in `src/extension.ts`.
