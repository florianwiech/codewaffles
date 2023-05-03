import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js
const require = createRequire(import.meta.url);
const { node } = require("./static/.electron-vendors.cache.json");

const PACKAGE_ROOT = dirname(fileURLToPath(import.meta.url));
const mainPath = "/packages/main";
const sharedPath = "/packages/shared";

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: join(PACKAGE_ROOT, mainPath),
  envDir: process.cwd(),
  build: {
    ssr: true,
    sourcemap: "inline",
    target: `node${node}`,
    outDir: join(PACKAGE_ROOT, "build/main"),
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: "main.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].cjs",
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    cache: {
      dir: "../../.vitest/main",
    },
  },
};

export default config;
