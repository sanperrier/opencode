# Codex Project-Agent Profiles

These files are handoff profiles, not executable agents.

Codex currently exposes general subagent mechanics such as `worker` and `explorer`. Project-specific behavior must be passed explicitly in the handoff prompt when spawning or using a subagent.

## Profiles

- `iteration-lead.md`: main-thread orchestration profile for specs, plans, approvals, review loops, and finalization.
- `focused-coder.md`: prompt basis for a spawned Codex `worker` doing bounded implementation.
- `focused-code-reviewer.md`: prompt basis for read-only review through the main thread or a Codex `explorer`.
- `context-explorer.md`: prompt basis for a Codex `explorer` answering bounded repo questions before planning or implementation.

## Handoff Rule

Every handoff should include:

- current iteration and phase
- accepted spec path, if one exists for the current phase
- approved plan path, if one exists for the current phase
- file/module ownership, or bounded read-only question for explorers
- allowed edits, or `read-only` for explorers
- forbidden edits
- E2E test intent and allowed mechanical adjustments
- contract-test expectations, if any
- validation commands
- relevant excerpts or section names to read
- expected return format

Do not assume a spawned subagent has read these files unless the handoff tells it exactly what to read and how to apply the profile.
