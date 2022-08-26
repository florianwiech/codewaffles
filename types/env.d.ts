/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

/**
 * Describes all existing environment variables and their types.
 * Required for Code completion and type checking
 *
 * Note: To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code
 *
 * @see https://github.com/vitejs/vite/blob/cab55b32de62e0de7d7789e8c2a1f04a8eae3a3f/packages/vite/types/importMeta.d.ts#L62-L69 Base Interface
 * @see https://vitejs.dev/guide/env-and-mode.html#env-files Vite Env Variables Doc
 */
interface ImportMetaEnv {
  /**
   * The value of the variable is set in tools/dev.js and depends on packages/renderer/vite.config.js
   */
  readonly VITE_EDITOR_DEV_SERVER_URL: undefined | string;
  readonly VITE_SETTINGS_DEV_SERVER_URL: undefined | string;

  readonly VITE_CSP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
