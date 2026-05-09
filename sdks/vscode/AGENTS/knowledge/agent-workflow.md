# Agent Workflow

## Facts

### Working Area Purpose

- Trust: high
- Fact: `AGENTS/` is the local agent working area for this VS Code extension effort. It stores the current plan, workflow docs, and a scoped knowledge base to reduce repeated context loading.
- Sources: [`../plan.md`](../plan.md), [`../workflow.md`](../workflow.md), [`./index.md`](./index.md)

### Plan File

- Trust: high
- Fact: `AGENTS/plan.md` should stay updated with the current goal, current understanding, near-term plan, open questions, and verification targets.
- Sources: [`../plan.md`](../plan.md)

### Knowledge Index

- Trust: high
- Fact: `AGENTS/knowledge/index.md` is the first knowledge file to read; it maps tasks to fact groups so agents can avoid loading unrelated context.
- Sources: [`./index.md`](./index.md)

### Fact Format

- Trust: high
- Fact: Every stored fact should include a trust score (`low`, `medium`, or `high`) and source links to code, docs, tests, or live observations.
- Sources: User instruction in this session; examples in [`./vscode-extension-package.md`](./vscode-extension-package.md), [`./terminal-and-webview-constraints.md`](./terminal-and-webview-constraints.md), [`./opencode-web-client-sessions.md`](./opencode-web-client-sessions.md)

### Trust Score Meaning

- Trust: high
- Fact: Use `low` for plausible but unconfirmed information, `medium` for very probable information with evidence, and `high` for tested or directly confirmed information.
- Sources: User instruction in this session

### Updating Knowledge

- Trust: high
- Fact: Add or update facts only when they are likely to help future agents avoid re-reading broad context; keep groups scoped by domain and add new groups to the index.
- Sources: User instruction in this session; [`./index.md`](./index.md)

### Workflow Hub

- Trust: high
- Fact: `AGENTS/workflow.md` is the entrypoint for the iteration workflow; it links to role- and phase-specific workflow files so agents can read only relevant instructions.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/roles.md`](../workflow/roles.md)

### Iteration Phases

- Trust: high
- Fact: Iterations follow 4 phases: user-accepted spec, user-approved plan, focused implementation/review loop with up to 3 reviewer rejection rounds, then lead finalization with user review and plan/knowledge updates.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/iteration-overview.md`](../workflow/iteration-overview.md), [`../workflow/phase-1-spec.md`](../workflow/phase-1-spec.md), [`../workflow/phase-2-plan.md`](../workflow/phase-2-plan.md), [`../workflow/phase-3-implementation-review.md`](../workflow/phase-3-implementation-review.md), [`../workflow/phase-4-finalization.md`](../workflow/phase-4-finalization.md)

### Locked Iteration Artifacts

- Trust: high
- Fact: After user acceptance, `AGENTS/iterationX.spec.md` is locked/read-only; after user approval, `AGENTS/iterationX.plan.md` is locked/read-only. focused-coder and focused-code-reviewer may read but must not edit those artifacts.
- Sources: [`../workflow.md`](../workflow.md), [`../workflow/phase-1-spec.md`](../workflow/phase-1-spec.md), [`../workflow/phase-2-plan.md`](../workflow/phase-2-plan.md), [`../workflow/phase-3-implementation-review.md`](../workflow/phase-3-implementation-review.md)
