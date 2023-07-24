import { defineConfig } from "tsup";

export default defineConfig({
  platform: "node",
  target: "es2022",
  entry: ["src/**/*.ts"],
  format: ["cjs"],
  sourcemap: "inline",
  treeshake: true,
  metafile: true,
  skipNodeModulesBundle: true,
});
