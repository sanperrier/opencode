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
- Present the plan to the user and wait for approval.

## Required Plan Contents

- Iteration number and name.
- Link to accepted spec.
- Implementation approach.
- Files, components, or systems likely affected.
- Step-by-step implementation tasks.
- Explicit exclusions.
- Acceptance criteria copied from or linked to the spec.
- Validation or testing commands.
- Review focus areas.
- Risks and dependencies.

## User Approval

Do not delegate implementation until the user approves the plan.

## Locking

After user approval, `AGENTS/iterationX.plan.md` is locked/read-only. focused-coder and focused-code-reviewer may read it but must not edit it.

## Changing The Plan

Any scope-changing plan revision requires user approval. If the change alters accepted scope or acceptance criteria, return to phase 1 and revise the spec first.
