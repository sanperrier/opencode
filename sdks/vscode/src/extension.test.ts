import * as assert from "node:assert/strict";

import packageJson from "../package.json";
import { OPENCODE_VIEW_ID } from "./config";

const OPENCODE_CONTAINER_ID = "opencode";
const OPENCODE_VIEW_READY_MARKER = "opencode view ready";

type ViewContainer = {
  id?: string;
  title?: string;
  icon?: string;
};

type View = {
  id?: string;
  name?: string;
};

type ViewWelcome = {
  view?: string;
  contents?: string;
};

type ExtensionPackage = {
  contributes?: {
    viewsContainers?: {
      activitybar?: ViewContainer[];
    };
    views?: Record<string, View[] | undefined>;
    viewsWelcome?: ViewWelcome[];
  };
};

suite("extension manifest contract", () => {
  test("declares dedicated opencode activity bar container", () => {
    const container = getPackageJSON().contributes?.viewsContainers?.activitybar?.find(
      (item) => item.id === OPENCODE_CONTAINER_ID,
    );

    assert.ok(container, `Expected Activity Bar View Container '${OPENCODE_CONTAINER_ID}'`);
    assert.equal(container.title, "opencode");
    assert.ok(container.icon, "Expected opencode View Container to declare an icon");
    assert.ok(container.icon?.endsWith(".svg"), "Expected opencode View Container icon to use SVG");
  });

  test("contributes opencode view under dedicated container", () => {
    const view = getPackageJSON().contributes?.views?.[OPENCODE_CONTAINER_ID]?.find(
      (item) => item.id === OPENCODE_VIEW_ID,
    );

    assert.ok(view, `Expected opencode View '${OPENCODE_VIEW_ID}' under '${OPENCODE_CONTAINER_ID}'`);
    assert.equal(view.name, "opencode");
  });

  test("does not contribute opencode view only under explorer", () => {
    const explorerView = getPackageJSON().contributes?.views?.explorer?.find(
      (item) => item.id === OPENCODE_VIEW_ID,
    );

    assert.equal(explorerView, undefined);
  });

  test("declares opencode view readiness welcome content", () => {
    const welcome = getPackageJSON().contributes?.viewsWelcome?.find(
      (item) => item.view === OPENCODE_VIEW_ID,
    );

    assert.ok(welcome, `Expected viewsWelcome content for '${OPENCODE_VIEW_ID}'`);
    assert.ok(welcome.contents?.includes(OPENCODE_VIEW_READY_MARKER));
  });
});

function getPackageJSON() {
  return packageJson as ExtensionPackage;
}
