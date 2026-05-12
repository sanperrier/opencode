# Knowledge Index

Read only the groups relevant to the current task. Each fact includes trust, last verified date, one concrete claim, and sources.

## Rules

- Store durable facts that prevent future agents from re-reading broad context.
- Do not store active task TODOs, unapproved plans, conversation preferences, or long copied documentation.
- Add new files only for stable domains, not one-off tasks.
- Use this shape for every fact:

```md
### Short Fact Name

- Trust: high | medium | low
- Last verified: YYYY-MM-DD
- Fact: One concrete claim.
- Sources: [`path/to/file`](../../path/to/file), command output, official doc URL, or observed test/manual result.
```

## Groups

- [VS Code Extension Package](./vscode-extension-package.md): local package boundaries, commands, entrypoints, and build/release shape.
- [Development Environment](./development-environment.md): local tool versions, available commands, VS Code extension dev/test workflow, and current validation status.
- [Terminal And Webview Constraints](./terminal-and-webview-constraints.md): what VS Code allows for native terminals, editor tabs, contributed views, and Secondary Sidebar placement.
- [VS Code UI Containers](./vscode-ui-containers.md): VS Code workbench layout areas, views, view containers, panel/sidebar movement, and terminal placement implications.
- [OpenCode Web Client Sessions](./opencode-web-client-sessions.md): web command behavior, session URL shape, directory scoping, and observed web session-list behavior.
- [Agent Workflow](./agent-workflow.md): how to maintain this `AGENTS/` work area and update facts without loading irrelevant context.
