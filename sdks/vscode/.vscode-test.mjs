import { defineConfig } from "@vscode/test-cli"

export default defineConfig({
  files: "src/**/*.test.{js,ts}",
  mocha: {
    nodeOptions: ["--import @oxc-node/core/register"],
  }
})


