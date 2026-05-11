# Agent Workflow

## Facts

### Working Area Purpose

- Trust: high
- Last verified: 2026-05-11
- Fact: `AGENTS/` is the local agent working area for this VS Code extension effort. It stores the current plan, workflow docs, and a scoped knowledge base to reduce repeated context loading.
- Sources: [`../plan.md`](../plan.md), [`../workflow.md`](../workflow.md), [`./index.md`](./index.md)

### Plan File

- Trust: high
- Last verified: 2026-05-11
- Fact: `AGENTS/plan.md` should stay updated with the current goal, current understanding, near-term plan, open questions, and verification targets.
- Sources: [`../plan.md`](../plan.md)

### Knowledge Index

- Trust: high
- Last verified: 2026-05-11
- Fact: `AGENTS/knowledge/index.md` is the first knowledge file to read; it maps tasks to fact groups so agents can avoid loading unrelated context.
- Sources: [`./index.md`](./index.md)

### Fact Format

- Trust: high
- Last verified: 2026-05-11
- Fact: Every stored fact should include trust (`low`, `medium`, or `high`), `Last verified`, one concrete claim, and source links to code, docs, tests, commands, or live observations.
- Sources: User instruction in this session; [`./index.md`](./index.md)

### Trust Score Meaning

- Trust: high
- Last verified: 2026-05-11
- Fact: Use `low` for plausible but unconfirmed information, `medium` for very probable information with evidence, and `high` for tested or directly confirmed information.
- Sources: User instruction in this session

### Updating Knowledge

- Trust: high
- Last verified: 2026-05-11
- Fact: Add or update facts only when they are likely to help future agents avoid re-reading broad context; keep groups scoped by domain and add new groups to the index.
- Sources: User instruction in this session; [`./index.md`](./index.md)

### Knowledge Exclusions

- Trust: high
- Last verified: 2026-05-11
- Fact: `AGENTS/knowledge/` should not store current task TODOs, unapproved plans, conversation preferences, long copied documentation, or facts already obvious from one nearby file.
- Sources: User instruction in this session; [`./index.md`](./index.md)

### Workflow Hub

- Trust: high
- Last verified: 2026-05-11
- Fact: `AGENTS/workflow.md` is the entrypoint for the iteration workflow; it links to role- and phase-specific workflow files so agents can read only relevant instructions.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/roles.md`](../workflow/roles.md)

### Iteration Phases

- Trust: high
- Last verified: 2026-05-11
- Fact: Iterations follow 4 phases: user-accepted spec, user-approved plan, focused implementation/review loop with user implementation approval after reviewer approval, then lead finalization with user review and plan/knowledge updates.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/iteration-overview.md`](../workflow/iteration-overview.md), [`../workflow/phase-1-spec.md`](../workflow/phase-1-spec.md), [`../workflow/phase-2-plan.md`](../workflow/phase-2-plan.md), [`../workflow/phase-3-implementation-review.md`](../workflow/phase-3-implementation-review.md), [`../workflow/phase-4-finalization.md`](../workflow/phase-4-finalization.md)

### Phase 3 User Review Gate

- Trust: high
- Last verified: 2026-05-11
- Fact: After focused-code-reviewer approves an implementation, the user must review it before phase 4; user rejection restarts the coder/reviewer loop, and direct user edits require lead review before more delegation.
- Sources: [`../workflow/phase-3-implementation-review.md`](../workflow/phase-3-implementation-review.md), [`../workflow/iteration-overview.md`](../workflow/iteration-overview.md), [`../workflow/roles.md`](../workflow/roles.md)

### Locked Iteration Artifacts

- Trust: high
- Last verified: 2026-05-11
- Fact: After user acceptance, `AGENTS/iterationX.spec.md` is locked/read-only; after user approval, `AGENTS/iterationX.plan.md` is locked/read-only. focused-coder and focused-code-reviewer may read but must not edit those artifacts.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/phase-1-spec.md`](../workflow/phase-1-spec.md), [`../workflow/phase-2-plan.md`](../workflow/phase-2-plan.md), [`../workflow/phase-3-implementation-review.md`](../workflow/phase-3-implementation-review.md)

### Completed Iteration Archive

- Trust: high
- Last verified: 2026-05-11
- Fact: Completed iteration artifacts should live under `AGENTS/archive/` so active workflow state is separate from historical specs and plans.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/iteration-overview.md`](../workflow/iteration-overview.md)

### Project-Agent Profiles

- Trust: high
- Last verified: 2026-05-11
- Fact: `AGENTS/agents/` stores Codex handoff profiles for project roles; these files are prompt templates, not executable custom agents.
- Sources: [`../agents/README.md`](../agents/README.md), [`../workflow/roles.md`](../workflow/roles.md)
