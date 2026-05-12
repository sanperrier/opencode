# Phase 1: Spec

## Purpose

Phase 1 turns a broad request into a complete iteration specification. The spec defines the end result of the iteration well enough for focused-coder to implement and focused-code-reviewer to verify.

## Reader

This file is primarily for iteration-lead and the main orchestrator.

## Responsibilities

- Understand the requested outcome, constraints, priorities, dependencies, and success criteria.
- Ask concise clarifying questions when requirements are ambiguous, risky, or likely to affect scope.
- Avoid over-questioning when a reasonable assumption can be stated and used.
- Define goals, non-goals, assumptions, risks, and validation expectations.
- Define end-to-end behavior scenarios for user-visible functionality.
- Keep E2E scenarios focused on externally observable behavior, not implementation details or manifest shape.
- Save the accepted specification as `AGENTS/iterationX.spec.md`.

## Required Spec Contents

- Iteration number and name.
- Iteration goal.
- Scope included.
- Scope explicitly excluded.
- User-visible behavior or expected outcome.
- Acceptance criteria.
- End-to-end behavior scenarios.
- Validation or testing expectations.
- Any separate contract or technical checks needed to enforce non-user-visible requirements.
- Known risks and dependencies.
- Assumptions.
- Approval status.

## E2E Test Intent

Phase 1 should capture the intended E2E behavior before implementation planning starts.

- E2E scenarios describe what a user can do or observe.
- E2E scenarios must not assert internal file layout, contribution JSON shape, helper function names, implementation classes, or other technical details.
- Technical requirements that are not directly user-observable belong in acceptance criteria and contract-test expectations, not E2E scenarios.
- If a future implementation needs to change E2E intent, return to phase 1 and ask the user to accept the revised spec.

## User Acceptance

Do not create the phase 2 plan or delegate implementation until the user accepts the spec.

## Locking

After user acceptance, `AGENTS/iterationX.spec.md` is locked/read-only. focused-coder and focused-code-reviewer may read it but must not edit it.

## Changing The Spec

Any critical blocker or scope change that requires editing the accepted spec must be approved by the user first. If approved, the iteration returns to phase 1 and the spec must be re-accepted before planning resumes.
