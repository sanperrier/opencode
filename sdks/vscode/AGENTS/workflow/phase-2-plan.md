# Phase 2: Plan

## Purpose

Phase 2 turns the accepted spec into an implementation and review plan. The plan guides focused-coder implementation and focused-code-reviewer validation without changing the accepted scope.

## Reader

This file is primarily for iteration-lead and the main orchestrator.

## Responsibilities

- Read the accepted `AGENTS/iterationX.spec.md`.
- Create `AGENTS/iterationX.plan.md` from the accepted spec.
- Keep the plan within the accepted scope.
- Include enough implementation detail for focused-coder.
- Include enough review focus for focused-code-reviewer.
- Translate accepted E2E scenarios into a concrete test plan before implementation starts.
- Separate E2E tests from technical contract tests.
- Present the plan to the user and wait for approval.

## Required Plan Contents

- Iteration number and name.
- Link to accepted spec.
- Implementation approach.
- Files, components, or systems likely affected.
- Step-by-step implementation tasks.
- E2E test plan derived from the accepted spec.
- Technical contract-test plan, if non-user-visible constraints need automated enforcement.
- Explicit exclusions.
- Acceptance criteria copied from or linked to the spec.
- Validation or testing commands.
- Review focus areas.
- Risks and dependencies.

## E2E Test Plan

The phase 2 plan should specify the E2E test intent before focused-coder starts implementation.

- E2E tests should verify user-visible functionality and observable workflows.
- E2E tests should avoid asserting implementation details such as manifest structure, internal IDs, file names, helper functions, class names, or provider internals.
- Contract tests may verify technical details required by the accepted spec, but they must be labeled separately from E2E tests.
- The approved plan locks the E2E intent. focused-coder and focused-code-reviewer may adjust test mechanics such as waits, selectors, setup, teardown, or stable API usage only when the behavioral intent remains unchanged.
- Any change to E2E intent requires returning to phase 1 if it changes accepted behavior, or phase 2 if it only changes approved test coverage within accepted scope.

## User Approval

Do not delegate implementation until the user approves the plan.

## Locking

After user approval, `AGENTS/iterationX.plan.md` is locked/read-only. focused-coder and focused-code-reviewer may read it but must not edit it.

## Changing The Plan

Any scope-changing plan revision requires user approval. If the change alters accepted scope or acceptance criteria, return to phase 1 and revise the spec first.
