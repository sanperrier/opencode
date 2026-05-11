import * as assert from "node:assert/strict";
import * as vscode from "vscode";

import { OPENCODE_VIEW_ID } from "./config";
import type { activate } from './extension';

const EXTENSION_ID = "sst-dev.opencode";
const OPENCODE_CONTAINER_ID = "opencode";
const OPENCODE_VIEW_READY_MARKER = "opencode view ready";

suite("extension", () => {
  test("registers opencode commands", async () => {
    const extension = getExtension();

    await extension.activate();

    const commands = await vscode.commands.getCommands(true);

    assert.ok(commands.includes("opencode.openTerminal"));
    assert.ok(commands.includes("opencode.openNewTerminal"));
    assert.ok(commands.includes("opencode.addFilepathToTerminal"));
  });

  // test("declares startup-visible opencode view surface", async () => {
  //   const packageJSON = getPackageJSON();

  //   assert.ok(
  //     packageJSON.activationEvents?.includes("onStartupFinished"),
  //     "Expected extension to activate on startup so the opencode view provider is registered without a user command",
  //   );

  //   const activityBarContainers = packageJSON.contributes?.viewsContainers?.activitybar ?? [];
  //   const container = activityBarContainers.find(
  //     (item) => item.id === OPENCODE_CONTAINER_ID,
  //   );

  //   assert.ok(container, `Expected an Activity Bar View Container with id '${OPENCODE_CONTAINER_ID}'`);
  //   assert.equal(container.title, "opencode");
  //   assert.ok(container.icon, "Expected the opencode View Container to declare an icon");

  //   const views = packageJSON.contributes?.views?.[OPENCODE_CONTAINER_ID] ?? [];
  //   const view = views.find((item) => item.id === OPENCODE_VIEW_ID);

  //   assert.ok(view, `Expected an opencode View with id '${OPENCODE_VIEW_ID}'`);
  //   assert.equal(view.name, "opencode");
  //   assert.equal(
  //     view.visibility,
  //     "visible",
  //     "Expected opencode view to be visible the first time a workspace opens",
  //   );

  //   const welcome = packageJSON.contributes?.viewsWelcome?.find((item) => item.view === OPENCODE_VIEW_ID);

  //   assert.ok(welcome, `Expected viewsWelcome content for '${OPENCODE_VIEW_ID}'`);
  //   assert.ok(
  //     welcome.contents?.includes(OPENCODE_VIEW_READY_MARKER),
  //     `Expected viewsWelcome content to include '${OPENCODE_VIEW_READY_MARKER}'`,
  //   );
  // });

  test("opens and resolves registered opencode view provider", async () => {
    const ext = getExtension();
    
    const extApi = await ext.activate();
    await vscode.commands.executeCommand(`${OPENCODE_VIEW_ID}.open`);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // assert.ok(
    //   extApi.viewProvider.getTreeItemCalled() > 0, 
    //   "Expected getTreeItem to have been called on the view provider"
    // );
    assert.ok(
      extApi.viewProvider.getChildrenCalled() > 0, 
      "Expected getChildren to have been called on the view provider"
    );
  });
});

function getExtension() {
  const extension = vscode.extensions.getExtension<ReturnType<typeof activate>>(EXTENSION_ID);

  assert.ok(extension, `Expected ${EXTENSION_ID} extension to be available in the test host`);

  return extension;
}

// async function getOpencodeViewId() {
//   const modulePath = vscode.Uri.joinPath(getExtension().extensionUri, "dist", "extension.js").toString();
//   const extensionModule = await import(modulePath) as {
//     OPENCODE_VIEW_ID?: string;
//     default?: { OPENCODE_VIEW_ID?: string };
//   };
//   const opencodeViewId = extensionModule.OPENCODE_VIEW_ID ?? extensionModule.default?.OPENCODE_VIEW_ID;

//   assert.ok(opencodeViewId, "Expected compiled extension module to export OPENCODE_VIEW_ID");

//   return opencodeViewId;
// }

// async function withTimeout(promise: Promise<void>, message: string) {
//   let timeout: ReturnType<typeof setTimeout> | undefined;
//   try {
//     await Promise.race([
//       promise,
//       new Promise<void>((_, reject) => {
//         timeout = setTimeout(() => reject(new Error(message)), 5_000);
//       }),
//     ]);
//   } finally {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//   }
// }
