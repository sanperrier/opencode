# Iteration Overview

## Purpose

Iterations keep delivery controlled. Each iteration should produce a complete working feature, focused improvement, or complete step toward the global goal that the user can test in some way.

## Size Guidance

- Prefer moderate iterations that a smaller focused model can implement in one pass.
- Avoid tiny iterations that create overhead without user-visible value.
- Avoid broad iterations that mix unrelated features or require open-ended architecture work.
- Keep each iteration focused on one feature or one group of very similar features.

## Required Phases

1. Spec discovery and acceptance.
2. Plan creation and approval.
3. Implementation and focused technical review.
4. Lead-level finalization and user review.

## Required Artifacts

- `AGENTS/iterationX.spec.md` is created during phase 1.
- `AGENTS/iterationX.plan.md` is created during phase 2.
- `AGENTS/plan.md` is updated after phase 4 when the global plan changes.
- `AGENTS/knowledge/` is updated after phase 4 when durable facts were learned.
- Completed iteration specs and plans move to `AGENTS/archive/` after finalization.

## Test Intent Ownership

- Phase 1 defines E2E behavior scenarios as part of the spec.
- Phase 2 turns those scenarios into an executable E2E test plan.
- Phase 3 may adjust E2E mechanics for stability, but must not change what user-visible behavior the tests prove.
- Technical constraints can have contract tests, but they should be tracked separately from E2E tests.

## State Transitions

1. Draft spec becomes accepted spec only after user acceptance.
2. Accepted spec unlocks phase 2 planning.
3. Draft plan becomes approved plan only after user approval.
4. Approved plan unlocks phase 3 implementation.
5. focused-coder implementation goes to focused-code-reviewer.
6. Reviewer approval unlocks user implementation review.
7. User implementation approval unlocks phase 4 finalization.
8. Phase 4 user review completes the iteration and allows the next iteration to begin.

## User Intervention During Phase 3

The user remains inside the implementation loop. After reviewer approval, the implementation is presented to the user before finalization. The user can approve it, reject it with explanation, or edit files directly.

- User approval allows phase 4 finalization.
- User rejection restarts the focused-coder to focused-code-reviewer loop with the user's explanation as required feedback.
- User edits require lead/main-thread review before more delegation. The lead summarizes the edits, preserves them, and adjusts the next handoff. If the edits require a material plan or spec change, return to phase 2 or phase 1 respectively.

## Reset Rule

A critical change to accepted scope, acceptance criteria, architecture, validation expectations, or locked artifacts requires user approval. If the change affects the accepted spec, the iteration effectively resets to phase 1.

## Gate Rule

Do not proceed to the next phase without the required user approval or reviewer acceptance for the current phase.
