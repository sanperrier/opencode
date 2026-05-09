# Phase 3: Implementation And Review

## Purpose

Phase 3 implements the approved iteration and verifies it through focused technical review.

## Readers

This file is required for focused-coder, focused-code-reviewer, iteration-lead, and the main orchestrator during implementation.

## focused-coder Reading Scope

- Read this file.
- Read the approved `AGENTS/iterationX.spec.md`.
- Read the approved `AGENTS/iterationX.plan.md`.
- Read `AGENTS/knowledge/index.md`, then only relevant knowledge groups.
- Read only code and docs needed to implement the approved plan.

## focused-coder Rules

- Implement only the accepted spec and approved plan.
- Do not edit accepted specs or approved plans.
- Do not broaden scope without escalation and user approval.
- Keep changes minimal and aligned with the plan.
- Run the validation requested in the plan when feasible.
- Return a concise implementation summary, changed files, validation performed, and any caveats.

## focused-code-reviewer Reading Scope

- Read this file.
- Read the approved `AGENTS/iterationX.spec.md`.
- Read the approved `AGENTS/iterationX.plan.md`.
- Read the focused-coder implementation summary.
- Review the current iteration diff and relevant surrounding code only.

## focused-code-reviewer Rules

- Review only current iteration changes unless explicitly instructed otherwise.
- Check correctness, regressions, missed edge cases, integration risks, maintainability, security risks, and validation gaps.
- Verify alignment with the accepted spec and approved plan.
- Do not edit accepted specs or approved plans.
- Return a pass/fail decision.
- Group findings by severity.
- Include required fixes and validation concerns.

## Review Loop

If the reviewer rejects the work, iteration-lead or the main orchestrator sends the findings back to focused-coder for fixes. The fixed result returns to focused-code-reviewer for re-review.

## Rejection Limit

The loop is limited to 3 reviewer rejection rounds per iteration. After 3 rejections, stop implementation work and escalate to iteration-lead, the main orchestrator, and the user.

## Approval Gate

Do not enter phase 4 until focused-code-reviewer approves the implementation.
