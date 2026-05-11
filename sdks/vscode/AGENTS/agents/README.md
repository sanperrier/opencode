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
- accepted spec path
- approved plan path
- file/module ownership
- allowed edits
- forbidden edits
- validation commands
- expected return format

Do not assume a spawned subagent has read these files unless the handoff tells it exactly what to read and how to apply the profile.
