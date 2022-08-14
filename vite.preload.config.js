import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

// https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js
const require = createRequire(import.meta.url);
const { chrome } = require("./static/.electron-vendors.cache.json");

const PACKAGE_ROOT = dirname(fileURLToPath(import.meta.url));
const preloadPath = "/packages/preload";
const sharedPath = "/packages/shared";

/**
 * @type {import("vite").UserConfig}
 * @see https://vitejs.dev/config/
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: join(PACKAGE_ROOT, preloadPath),
  envDir: process.cwd(),
  build: {
    ssr: true,
    sourcemap: "inline",
    target: `chrome${chrome}`,
    outDir: join(PACKAGE_ROOT, "build/preload"),
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: join(PACKAGE_ROOT, preloadPath, "index.ts"),
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].cjs",
        format: "cjs",
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    cache: {
      dir: "../../.vitest/preload",
    },
  },
};

export default config;
