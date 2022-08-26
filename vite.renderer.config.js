import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js
const require = createRequire(import.meta.url);
const { chrome } = require("./static/.electron-vendors.cache.json");

const PACKAGE_ROOT = dirname(fileURLToPath(import.meta.url));
const rendererPath = "/packages/renderer";
const sharedPath = "/packages/shared";

// https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
const env = loadEnv(process.env.MODE, ".");

const htmlPlugin = () => ({
  name: "html-transform",
  transformIndexHtml: (html) => html.replace(/<%=\s*([a-zA-Z_]+)\s*%>/g, (_match, variableName) => env[variableName]),
});

/**
 * @type {import("vite").UserConfig}
 * @see https://vitejs.dev/config/
 * @see https://vitest.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: join(PACKAGE_ROOT, rendererPath),
  base: "", // use relative base path for embedded deployment
  resolve: {
    alias: {
      "~/": join(PACKAGE_ROOT, rendererPath, "src") + "/",
      "/@api/": join(PACKAGE_ROOT, sharedPath) + "/",
    },
  },
  publicDir: "../../static/public",
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: join(PACKAGE_ROOT, "build/renderer"),
    assetsDir: ".",
    rollupOptions: {
      input: {
        editor: join(PACKAGE_ROOT, rendererPath, "editor.html"),
        settings: join(PACKAGE_ROOT, rendererPath, "settings.html"),
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    environment: "happy-dom",
    setupFiles: join(PACKAGE_ROOT, rendererPath, "src", "setupTests.ts"),
    cache: {
      dir: "../../.vitest/renderer",
    },
  },
  plugins: [react(), svgr(), htmlPlugin()],
};

export default config;
