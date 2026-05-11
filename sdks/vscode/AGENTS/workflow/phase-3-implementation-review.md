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

If the reviewer approves the work, do not enter phase 4 immediately. Present the reviewed implementation to the user for implementation review.

## User Implementation Review

After focused-code-reviewer returns `Approved` or `Approved with comments`, iteration-lead or the main orchestrator presents the implementation to the user with:

- changed files
- implementation summary
- reviewer verdict
- validation performed
- caveats or residual risks
- the decision needed from the user

The user may choose one of three outcomes:

- Approve: phase 3 is complete and the iteration may enter phase 4 finalization.
- Reject with explanation: treat the explanation as required feedback, send it to focused-coder with the reviewer summary, and restart the implementation/review loop.
- Edit files directly: pause coder delegation, review the user changes in the main thread, summarize what changed, and decide whether the approved plan or handoff instructions need adjustment before more coder work.

## User-Edited Changes

When the user edits files during phase 3, iteration-lead or the main orchestrator must review those changes before delegating more work.

- Inspect the diff against the last reviewed implementation.
- Summarize the user changes and how they affect the accepted spec and approved plan.
- If the changes fit the accepted spec and approved plan, update the next focused-coder handoff with the new source truth and send any remaining work back through focused-coder.
- If the approved plan needs a material change, return to phase 2 and ask the user to approve the revised plan before more implementation.
- If the accepted spec needs a material change, return to phase 1 and ask the user to accept the revised spec before planning resumes.
- Preserve user edits unless the user explicitly asks to replace or revert them.
- After any coder follow-up, send the result back to focused-code-reviewer before presenting it to the user again.

## Rejection Limit

The loop is limited to 3 rejection rounds per iteration. Count both reviewer rejections and user implementation rejections when they require another focused-coder pass. Do not count user-edited changes as rejections unless the user explicitly rejects the implementation. After 3 rejections, stop implementation work and escalate to iteration-lead, the main orchestrator, and the user.

## Approval Gate

Do not enter phase 4 until focused-code-reviewer approves the implementation and the user approves the reviewed implementation.
