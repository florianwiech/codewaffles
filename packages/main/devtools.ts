import { isDevMode } from "./utils/devmode";

/**
 * Installs developer tools if we're in dev mode.
 *
 * @export
 * @returns {Promise<void>}
 */
export async function setupDevTools(): Promise<void> {
  if (!isDevMode()) return;

  const {
    // @ts-expect-error Hotfix for https://github.com/vitejs/vite/issues/2139
    default: { default: installExtension },
    REACT_DEVELOPER_TOOLS,
  } = await import("electron-devtools-installer");

  try {
    const react = await installExtension(REACT_DEVELOPER_TOOLS);
    // eslint-disable-next-line no-console
    console.log(`installDevTools: Installed ${react}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`installDevTools: Error occurred:`, error);
  }
}
