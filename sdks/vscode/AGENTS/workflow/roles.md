# Roles

## Main Orchestrator

- Maintains continuity with the user.
- Reads workflow docs as needed for the current phase.
- Runs iteration-lead behavior in the current Codex thread for coordinated planning and orchestration.
- Ensures user approval gates are respected.
- Does not silently skip focused review for implemented work.
- Presents reviewer-approved implementation to the user before phase 4.
- If the user edits files directly, reviews and summarizes those edits before delegating more work.

## iteration-lead

- Runs discovery and planning mode for broad or multi-step work.
- Creates accepted specs and approved plans with user approval.
- Defines E2E behavior intent in phase 1 and executable E2E test planning in phase 2.
- Keeps technical contract tests separate from E2E tests.
- Orchestrates focused-coder and focused-code-reviewer during implementation.
- Enforces the 3-rejection review limit.
- Presents reviewer-approved implementation to the user for approval before phase 4.
- Restarts the coder/reviewer loop when the user rejects with explanation.
- Reviews user-edited changes, summarizes their impact, and revises the next handoff or returns to phase 1/2 when locked artifacts need material changes.
- Performs lead-level finalization after reviewer approval and user implementation approval.
- Presents iteration outcomes and next decisions to the user.
- Codex mapping: current thread, using `AGENTS/agents/iteration-lead.md` as the operating profile.

## focused-coder

- Implements only the approved iteration.
- Reads the handoff packet, focused-coder profile, phase 3 rules, named sections of the accepted spec and approved plan, and relevant knowledge/code.
- Does not edit accepted specs or approved plans.
- Preserves approved E2E test intent and only adjusts mechanics when necessary.
- Escalates when implementation requires scope, acceptance criteria, architecture, or validation changes.
- Returns changed files, summary, validation, and caveats.
- Codex mapping: spawned `worker` using `gpt-5.4-mini`, with explicit file/module ownership and `AGENTS/agents/focused-coder.md` included in the handoff.

## focused-code-reviewer

- Reviews recently implemented current-iteration changes.
- Reads the handoff packet, reviewer profile, phase 3 review rules, named sections of the accepted spec and approved plan, the implementation summary, and relevant diff/code.
- Does not edit accepted specs or approved plans.
- Confirms E2E tests remain user-behavior tests and contract tests remain separate.
- Returns pass/fail, severity-grouped findings, required fixes, and validation concerns.
- Reviewer approval is necessary but not sufficient for phase 4; user implementation approval is also required.
- Codex mapping: spawned read-only `explorer` using `gpt-5.3-codex` and `AGENTS/agents/focused-code-reviewer.md` as the review profile.

## context-explorer

- Answers bounded read-only repo questions before planning, implementation, or review.
- Reads only relevant knowledge/code needed for the concrete question.
- Returns direct answers with file references, evidence, and uncertainty.
- Codex mapping: spawned `explorer` using `AGENTS/agents/context-explorer.md` as the handoff profile.

## Ownership Boundaries

- Spec ownership belongs to iteration-lead/main during phase 1 and the user after acceptance.
- Plan ownership belongs to iteration-lead/main during phase 2 and the user after approval.
- Implementation ownership belongs to focused-coder during phase 3.
- Technical review ownership belongs to focused-code-reviewer during phase 3.
- Bounded discovery ownership belongs to context-explorer when delegated.
- Finalization ownership belongs to iteration-lead/main during phase 4.

## Reading Matrix

| Role | Should Read | Should Not Read By Default |
| --- | --- | --- |
| Main orchestrator | `AGENTS/workflow.md`, current phase doc, roles, current spec/plan | Unrelated knowledge groups or broad code areas |
| iteration-lead | `AGENTS/workflow.md`, overview, current phase doc, roles, current spec/plan, escalation/output style when needed | Deep implementation code unless planning requires it |
| focused-coder | Handoff packet, focused-coder profile, phase 3 rules, named spec/plan sections, relevant knowledge/code | Phase 1/2 process docs, unrelated knowledge groups, broad codebase |
| focused-code-reviewer | Handoff packet, reviewer profile, phase 3 review rules, named spec/plan sections, implementation summary, relevant diff/code | Phase 1/2 process docs, unrelated code or old iterations |
| context-explorer | Specific files, knowledge groups, and code needed to answer the assigned question | Unrelated code, implementation edits, workflow artifacts not needed for the question |
