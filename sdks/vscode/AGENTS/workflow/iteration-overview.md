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

## State Transitions

1. Draft spec becomes accepted spec only after user acceptance.
2. Accepted spec unlocks phase 2 planning.
3. Draft plan becomes approved plan only after user approval.
4. Approved plan unlocks phase 3 implementation.
5. Reviewer approval unlocks phase 4 finalization.
6. User review completes the iteration and allows the next iteration to begin.

## Reset Rule

A critical change to accepted scope, acceptance criteria, architecture, validation expectations, or locked artifacts requires user approval. If the change affects the accepted spec, the iteration effectively resets to phase 1.

## Gate Rule

Do not proceed to the next phase without the required user approval or reviewer acceptance for the current phase.
