# VS Code UI Containers

## Facts

### Workbench Layout Areas

- Trust: high
- Last verified: 2026-05-09
- Fact: VS Code's main movable UI areas include the Primary Side Bar, Secondary Side Bar, Activity Bar, Panel, editor area, and Status Bar. The Panel contains views such as Problems, Output, Debug Console, and Terminal, and the Panel itself can be moved to the left, right, bottom, or top.
- Sources: VS Code User Interface docs, `https://code.visualstudio.com/docs/getstarted/userinterface`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`

### Secondary Side Bar Behavior

- Trust: high
- Last verified: 2026-05-09
- Fact: The Secondary Side Bar is an auxiliary location for views. Extensions cannot contribute views directly to the Secondary Side Bar by default, but users can drag views from the Primary Side Bar or Panel into it. VS Code remembers view and panel layout across sessions.
- Sources: VS Code Sidebars UX docs, `https://code.visualstudio.com/api/ux-guidelines/sidebars`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`

### Views And View Containers

- Trust: high
- Last verified: 2026-05-09
- Fact: Views are content containers that can appear in the Side Bar or Panel. Views can contain Tree Views, Welcome Views, or Webview Views, can expose view actions, and can be rearranged or moved by users to another View Container, including the Secondary Side Bar.
- Sources: VS Code Views UX docs, `https://code.visualstudio.com/api/ux-guidelines/views`; VS Code Tree View guide, `https://code.visualstudio.com/api/extension-guides/tree-view`

### View Container Contributions

- Trust: high
- Last verified: 2026-05-11
- Fact: View Containers are parent containers for one or more Views. Extensions can contribute custom View Containers to the Activity Bar/Primary Side Bar or to the Panel via `contributes.viewsContainers`, then contribute Views into them via `contributes.views`.
- Sources: VS Code Tree View guide, `https://code.visualstudio.com/api/extension-guides/tree-view`; VS Code Contribution Points reference, `https://code.visualstudio.com/api/references/contribution-points`; current contributions in [`../../package.json`](../../package.json)

### Panel As Container Host

- Trust: high
- Last verified: 2026-05-09
- Fact: The Panel is a host for View Containers. It is appropriate for supporting functionality and horizontal-space-heavy views, but users often minimize it, so always-visible views should not rely only on the Panel.
- Sources: VS Code Panel UX docs, `https://code.visualstudio.com/api/ux-guidelines/panel`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`

### Built-In Terminal Layout

- Trust: high
- Last verified: 2026-05-11
- Fact: Native integrated terminals live in the built-in Terminal view/panel or editor area. Users can move the Terminal view/panel as part of VS Code layout customization and can move terminals into editor tabs or new windows, but extension APIs do not expose moving one terminal instance into a custom extension container.
- Sources: VS Code Terminal Basics docs, `https://code.visualstudio.com/docs/terminal/basics`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`; current extension terminal code in [`../../src/extension.ts`](../../src/extension.ts)

### Webview Options

- Trust: high
- Last verified: 2026-05-09
- Fact: Webviews can appear as editor panels, custom editors, or Webview Views rendered in side bar/panel areas. Webview HTML should be a complete document, use restrictive CSP, avoid scripts unless needed, and use VS Code theme CSS variables for native-feeling UI.
- Sources: VS Code Webview guide, `https://code.visualstudio.com/api/extension-guides/webview`

### Iteration 1 Current Partial State

- Trust: high
- Last verified: 2026-05-11
- Fact: Iteration 1 is reopened because the current implementation contributes `opencode.view` under built-in `explorer`, not a dedicated `opencode` View Container; the readiness marker exists, but the dedicated container contract is not implemented or enforced by active tests.
- Sources: [`../../package.json`](../../package.json), [`../../src/extension.ts`](../../src/extension.ts), [`../../src/extension.test.ts`](../../src/extension.test.ts), [`../iteration1.spec.md`](../iteration1.spec.md)

### VS Code Test Extension Install Directory

- Trust: medium
- Last verified: 2026-05-09
- Fact: `.vscode-test/extensions/extensions.json` can remain empty when running this package's `@vscode/test-cli` tests because the extension is loaded as a development extension from `sdks/vscode`, not installed into the test instance's extension directory.
- Sources: `.vscode-test/extensions/extensions.json` observed as `[]`; `vscode-test` output prints `Loading development extension at c:\Users\alien\work\@sanperrier\opencode\sdks\vscode`
