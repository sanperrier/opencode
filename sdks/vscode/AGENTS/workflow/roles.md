# Roles

## Main Orchestrator

- Maintains continuity with the user.
- Reads workflow docs as needed for the current phase.
- Uses iteration-lead for coordinated planning and orchestration when the task spans multiple phases or iterations.
- Ensures user approval gates are respected.
- Does not silently skip focused review for implemented work.

## iteration-lead

- Runs discovery and planning mode for broad or multi-step work.
- Creates accepted specs and approved plans with user approval.
- Orchestrates focused-coder and focused-code-reviewer during implementation.
- Enforces the 3-rejection review limit.
- Performs lead-level finalization after reviewer approval.
- Presents iteration outcomes and next decisions to the user.

## focused-coder

- Implements only the approved iteration.
- Reads phase 3, the accepted spec, the approved plan, and relevant knowledge/code.
- Does not edit accepted specs or approved plans.
- Escalates when implementation requires scope, acceptance criteria, architecture, or validation changes.
- Returns changed files, summary, validation, and caveats.

## focused-code-reviewer

- Reviews recently implemented current-iteration changes.
- Reads phase 3, the accepted spec, the approved plan, the implementation summary, and relevant diff/code.
- Does not edit accepted specs or approved plans.
- Returns pass/fail, severity-grouped findings, required fixes, and validation concerns.

## Ownership Boundaries

- Spec ownership belongs to iteration-lead/main during phase 1 and the user after acceptance.
- Plan ownership belongs to iteration-lead/main during phase 2 and the user after approval.
- Implementation ownership belongs to focused-coder during phase 3.
- Technical review ownership belongs to focused-code-reviewer during phase 3.
- Finalization ownership belongs to iteration-lead/main during phase 4.

## Reading Matrix

| Role | Should Read | Should Not Read By Default |
| --- | --- | --- |
| Main orchestrator | `AGENTS/workflow.md`, relevant phase docs, current spec/plan | Unrelated knowledge groups or broad code areas |
| iteration-lead | Overview, phase 1, phase 2, phase 4, roles, escalation, output style | Deep implementation code unless planning requires it |
| focused-coder | Phase 3, accepted spec, approved plan, relevant knowledge/code | Phase 1/2 process docs, unrelated knowledge groups, broad codebase |
| focused-code-reviewer | Phase 3, accepted spec, approved plan, implementation summary, relevant diff/code | Phase 1/2 process docs, unrelated code or old iterations |
