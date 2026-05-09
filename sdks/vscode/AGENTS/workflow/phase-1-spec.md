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
- Save the accepted specification as `AGENTS/iterationX.spec.md`.

## Required Spec Contents

- Iteration number and name.
- Iteration goal.
- Scope included.
- Scope explicitly excluded.
- User-visible behavior or expected outcome.
- Acceptance criteria.
- Validation or testing expectations.
- Known risks and dependencies.
- Assumptions.
- Approval status.

## User Acceptance

Do not create the phase 2 plan or delegate implementation until the user accepts the spec.

## Locking

After user acceptance, `AGENTS/iterationX.spec.md` is locked/read-only. focused-coder and focused-code-reviewer may read it but must not edit it.

## Changing The Spec

Any critical blocker or scope change that requires editing the accepted spec must be approved by the user first. If approved, the iteration returns to phase 1 and the spec must be re-accepted before planning resumes.
