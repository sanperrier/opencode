# Workflow

This package uses an iteration-based workflow. Each iteration should be large enough to produce a meaningful user-testable result, but small enough for a focused implementation pass and review loop.

## Read This First

- All agents should read this file before using workflow details.
- Agents should read only the detailed workflow files needed for their role.
- Agents must not broaden their reading scope unless blocked or explicitly instructed.
- Accepted specs and approved plans are locked/read-only.
- Any change to locked iteration artifacts requires user approval.

## Workflow Files

- [Iteration Overview](./workflow/iteration-overview.md): lifecycle, artifacts, phase gates, and reset rules.
- [Phase 1: Spec](./workflow/phase-1-spec.md): requirements gathering and accepted spec rules.
- [Phase 2: Plan](./workflow/phase-2-plan.md): approved implementation plan rules.
- [Phase 3: Implementation And Review](./workflow/phase-3-implementation-review.md): focused-coder and focused-code-reviewer loop.
- [Phase 4: Finalization](./workflow/phase-4-finalization.md): lead review, user review, and knowledge updates.
- [Roles](./workflow/roles.md): responsibilities, ownership, and reading boundaries.
- [Escalation](./workflow/escalation.md): blockers, rejection limit, and escalation format.
- [Output Style](./workflow/output-style.md): state labels, handoffs, approvals, and summaries.
- [Project-Agent Profiles](./agents/README.md): Codex handoff profiles for main-thread orchestration, workers, reviewers, and explorers.

## Role Reading Guide

| Role | Read |
| --- | --- |
| Main orchestrator | This file, overview, relevant phase docs, roles, escalation, current spec/plan |
| iteration-lead | This file, overview, phase 1, phase 2, phase 3, phase 4, roles, escalation, output style, current spec/plan |
| focused-coder | This file, phase 3, roles, approved `AGENTS/iterationX.spec.md`, approved `AGENTS/iterationX.plan.md`, relevant knowledge/code only |
| focused-code-reviewer | This file, phase 3, roles, approved spec, approved plan, implementation summary, relevant diff/code only |
| context-explorer | This file, roles, relevant knowledge/code only |

## Iteration Artifacts

- `AGENTS/iterationX.spec.md`: accepted end-result specification for iteration X.
- `AGENTS/iterationX.plan.md`: approved implementation and review plan for iteration X.
- `AGENTS/plan.md`: current global goal, plan, open questions, and verification targets.
- `AGENTS/knowledge/`: durable facts that reduce future context loading.
- `AGENTS/archive/`: completed iteration specs and plans after finalization.

## Phase Summary

1. Analyze with the user, formulate `AGENTS/iterationX.spec.md`, and wait for user acceptance.
2. Create `AGENTS/iterationX.plan.md` from the accepted spec and wait for user approval.
3. Delegate implementation to focused-coder, review with focused-code-reviewer, then present reviewer-approved work to the user for implementation approval.
4. If the user rejects or edits files, restart or adjust the implementation/review loop before finalization.
5. Perform lead-level alignment review, present the finalized iteration to the user, and update plan/knowledge after finalization.

## Lock Rule

After user acceptance, `AGENTS/iterationX.spec.md` is read-only. After user approval, `AGENTS/iterationX.plan.md` is read-only. focused-coder and focused-code-reviewer may read those files but must not edit them.

## Handoff Template

Use this shape when delegating to a Codex worker or explorer:

- Current iteration and phase.
- Accepted spec path.
- Approved plan path.
- File or module ownership.
- Allowed edits.
- Forbidden edits.
- Validation commands.
- Expected return format.

Project-agent profiles in `AGENTS/agents/` are prompt templates, not executable agents. Include the relevant profile rules directly in the handoff.
