# VS Code UI Containers

## Facts

### Workbench Layout Areas

- Trust: high
- Fact: VS Code's main movable UI areas include the Primary Side Bar, Secondary Side Bar, Activity Bar, Panel, editor area, and Status Bar. The Panel contains views such as Problems, Output, Debug Console, and Terminal, and the Panel itself can be moved to the left, right, bottom, or top.
- Sources: VS Code User Interface docs, `https://code.visualstudio.com/docs/getstarted/userinterface`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`

### Secondary Side Bar Behavior

- Trust: high
- Fact: The Secondary Side Bar is an auxiliary location for views. Extensions cannot contribute views directly to the Secondary Side Bar by default, but users can drag views from the Primary Side Bar or Panel into it. VS Code remembers view and panel layout across sessions.
- Sources: VS Code Sidebars UX docs, `https://code.visualstudio.com/api/ux-guidelines/sidebars`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`

### Views And View Containers

- Trust: high
- Fact: Views are content containers that can appear in the Side Bar or Panel. Views can contain Tree Views, Welcome Views, or Webview Views, can expose view actions, and can be rearranged or moved by users to another View Container, including the Secondary Side Bar.
- Sources: VS Code Views UX docs, `https://code.visualstudio.com/api/ux-guidelines/views`; VS Code Tree View guide, `https://code.visualstudio.com/api/extension-guides/tree-view`

- Trust: high
- Fact: View Containers are parent containers for one or more Views. Extensions can contribute custom View Containers to the Activity Bar/Primary Side Bar or to the Panel via `contributes.viewsContainers`, then contribute Views into them via `contributes.views`.
- Sources: VS Code Tree View guide, `https://code.visualstudio.com/api/extension-guides/tree-view`; VS Code Contribution Points reference, `https://code.visualstudio.com/api/references/contribution-points`

### Panel As Container Host

- Trust: high
- Fact: The Panel is a host for View Containers. It is appropriate for supporting functionality and horizontal-space-heavy views, but users often minimize it, so always-visible views should not rely only on the Panel.
- Sources: VS Code Panel UX docs, `https://code.visualstudio.com/api/ux-guidelines/panel`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`

### Built-In Terminal Layout

- Trust: high
- Fact: Native integrated terminals live in the built-in Terminal view/panel or editor area. Users can move the Terminal view/panel as part of VS Code layout customization and can move terminals into editor tabs or new windows, but extension APIs do not expose moving one terminal instance into a custom extension container.
- Sources: VS Code Terminal Basics docs, `https://code.visualstudio.com/docs/terminal/basics`; VS Code Custom Layout docs, `https://code.visualstudio.com/docs/configure/custom-layout`; current extension terminal code in [`../../src/extension.ts`](../../src/extension.ts)

### Webview Options

- Trust: high
- Fact: Webviews can appear as editor panels, custom editors, or Webview Views rendered in side bar/panel areas. Webview HTML should be a complete document, use restrictive CSP, avoid scripts unless needed, and use VS Code theme CSS variables for native-feeling UI.
- Sources: VS Code Webview guide, `https://code.visualstudio.com/api/extension-guides/webview`

### Iteration 1 Implication

- Trust: medium
- Fact: The next iteration should avoid assuming a specific Webview View implementation until the manifest/container shape is chosen. A dedicated opencode View Container plus one minimal view is the supported extension-owned movable surface, while native terminal placement should stay in the built-in Terminal view/editor workflows.
- Sources: VS Code docs above; current extension package lacks `views`/`viewsContainers` contributions in [`../../package.json`](../../package.json)
