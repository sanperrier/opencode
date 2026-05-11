# OpenCode Web Client Sessions

## Facts

### Web Command

- Trust: high
- Last verified: 2026-05-09
- Fact: `opencode web` starts an opencode server and opens the web interface in the browser.
- Sources: [`../../../../packages/opencode/src/cli/cmd/web.ts`](../../../../packages/opencode/src/cli/cmd/web.ts)

### Serve Command

- Trust: high
- Last verified: 2026-05-09
- Fact: `opencode serve` starts a headless opencode server without opening the browser.
- Sources: [`../../../../packages/opencode/src/cli/cmd/serve.ts`](../../../../packages/opencode/src/cli/cmd/serve.ts)

### Web Session Route Shape

- Trust: high
- Last verified: 2026-05-09
- Fact: The web app routes workspace/session pages as `/<base64(directory)>/session/<sessionID>`, where the directory slug decodes back to the workspace directory.
- Sources: [`../../../../packages/app/src/pages/layout.tsx`](../../../../packages/app/src/pages/layout.tsx), [`../../../../packages/app/src/pages/directory-layout.tsx`](../../../../packages/app/src/pages/directory-layout.tsx)

### Directory-Scoped Session Listing

- Trust: high
- Last verified: 2026-05-09
- Fact: `GET /session` supports a `directory` query parameter and returns sessions for that directory when not using `scope=project`.
- Sources: [`../../../../packages/opencode/src/server/routes/instance/session.ts`](../../../../packages/opencode/src/server/routes/instance/session.ts), [`../../../../packages/app/src/context/global-sync/session-load.ts`](../../../../packages/app/src/context/global-sync/session-load.ts)

### Current Live Session Was Backend-Visible

- Trust: medium
- Last verified: 2026-05-09
- Fact: During the 2026-05-09 planning session, `GET http://127.0.0.1:37160/session?directory=C:\Users\alien\work\@sanperrier\opencode\sdks\vscode&roots=true&limit=20` returned `ses_1f58e8ccaffeHy6ZhcOxt0r0z1`; this is historical observation, not current runtime state.
- Sources: Live API check run from `sdks/vscode` during the 2026-05-09 planning session.

### Sidebar May Lag Or Miss Sessions

- Trust: medium
- Last verified: 2026-05-09
- Fact: The web UI sidebar showed the correct workspace but initially did not show the current session even though the backend API returned it; direct session URL worked later.
- Sources: Live user screenshot and API check during this session; session sidebar code in [`../../../../packages/app/src/pages/layout/sidebar-workspace.tsx`](../../../../packages/app/src/pages/layout/sidebar-workspace.tsx)

### Prompt Send Failure Mode

- Trust: medium
- Last verified: 2026-05-09
- Fact: The web toast `Failed to send prompt / Unable to retrieve session` can occur when the composer has a route `params.id` but local synced session state cannot retrieve that session.
- Sources: [`../../../../packages/app/src/components/prompt-input.tsx`](../../../../packages/app/src/components/prompt-input.tsx), [`../../../../packages/app/src/components/prompt-input/submit.ts`](../../../../packages/app/src/components/prompt-input/submit.ts), [`../../../../packages/app/src/i18n/en.ts`](../../../../packages/app/src/i18n/en.ts)

### TUI Append Prompt Endpoint

- Trust: high
- Last verified: 2026-05-11
- Fact: The current VS Code extension appends file refs to the TUI through `POST /tui/append-prompt`, which publishes a `TuiEvent.PromptAppend`; this is TUI-specific, not obviously web-composer context injection.
- Sources: [`../../src/extension.ts`](../../src/extension.ts), [`../../../../packages/opencode/src/server/routes/instance/tui.ts`](../../../../packages/opencode/src/server/routes/instance/tui.ts), [`../../../../packages/opencode/src/server/routes/instance/httpapi/handlers/tui.ts`](../../../../packages/opencode/src/server/routes/instance/httpapi/handlers/tui.ts)

### Existing Deep Links

- Trust: high
- Last verified: 2026-05-09
- Fact: The web app currently parses `opencode://open-project?directory=...` and `opencode://new-session?directory=...&prompt=...` deep links.
- Sources: [`../../../../packages/app/src/pages/layout/deep-links.ts`](../../../../packages/app/src/pages/layout/deep-links.ts), [`../../../../packages/app/src/pages/layout.tsx`](../../../../packages/app/src/pages/layout.tsx)
