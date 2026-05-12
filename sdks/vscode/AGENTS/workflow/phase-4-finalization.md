# Phase 4: Finalization

## Purpose

Phase 4 confirms the reviewed implementation satisfies the accepted spec, presents the result to the user, and updates durable planning or knowledge artifacts.

## Reader

This file is primarily for iteration-lead and the main orchestrator.

## Preconditions

- focused-coder completed implementation.
- focused-code-reviewer approved the implementation.
- The user approved the reviewed implementation after phase 3 user implementation review.
- Phase 3 rejection count is below the escalation limit.

## Lead-Level Review

- Check feature fit and user value.
- Check scope alignment with the accepted spec.
- Check whether acceptance criteria are satisfied.
- Check whether validation expectations were met or clearly caveated.
- Do not replace the focused-code-reviewer technical review.

## User Finalization

Present the iteration result to the user with completed work, validation performed, caveats, and the next decision needed. Do not move to the next iteration until the user has reviewed the result or explicitly authorizes continuing.

## Updating Plan And Knowledge

- Update `AGENTS/plan.md` when the global goal, current understanding, next steps, open questions, or verification targets changed.
- Update `AGENTS/knowledge/` only for durable facts likely to prevent future agents from re-reading broad context.
- Add new knowledge groups to `AGENTS/knowledge/index.md`.
- Every knowledge fact must include trust, `Last verified`, one concrete claim, and source links.

## Completion Rule

An iteration is complete only after reviewer approval, user implementation approval, lead-level finalization, user presentation, and any relevant plan or knowledge updates.
