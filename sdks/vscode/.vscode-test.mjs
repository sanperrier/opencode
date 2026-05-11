import { defineConfig } from "@vscode/test-cli"
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
  label: 'tests',
  files: "dist/**/!(manual).test.js",
  workspaceFolder: '.vscode-test/test-workspace'
}, {
  label: 'manual',
  files: "dist/manual.test.js",
  workspaceFolder: '.vscode-test/test-workspace'
}]);
