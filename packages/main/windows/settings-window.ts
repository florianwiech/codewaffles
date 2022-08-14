import { BrowserWindow, nativeTheme } from "electron";
import { URL } from "url";
import { join } from "path";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";

const isDevMode = () => process.env.NODE_ENV !== "production";

export let settingsWindow: BrowserWindow | null = null;

/**
 * URL for main window.
 * Vite dev server for development.
 * `file://../renderer/settings.html` for production and test
 */
const pageUrl =
  import.meta.env.DEV && import.meta.env.VITE_SETTINGS_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_SETTINGS_DEV_SERVER_URL
    : new URL("./renderer/settings.html", "file://" + __dirname).toString();

const preloadPath = join(__dirname, "../preload/index.cjs");

/**
 * Gets default options for the main window
 */
export function getSettingsWindowOptions(): Electron.BrowserWindowConstructorOptions {
  return {
    width: isDevMode() ? 1357 : 570,
    height: 600,
    titleBarStyle: process.platform === "darwin" ? "hidden" : undefined,
    acceptFirstMouse: true,
    fullscreenable: false,
    resizable: false,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? dark.canvas.default : light.canvas.default,
    webPreferences: {
      preload: preloadPath,
      additionalArguments: ["common", "settings"],
    },
  };
}

/**
 * Creates a settings window.
 */
export function createSettingsWindow(): Electron.BrowserWindow {
  settingsWindow = new BrowserWindow(getSettingsWindowOptions());

  if (isDevMode()) {
    // Open the DevTools.
    settingsWindow.webContents.openDevTools();
  }

  settingsWindow.webContents.once("dom-ready", () => {
    if (settingsWindow) {
      settingsWindow.show();

      // todo try it out
      // createContextMenu(browserWindow);
    }
  });

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });

  // and load the settings.html of the app.
  settingsWindow.loadURL(pageUrl).then();

  return settingsWindow;
}

/**
 * Gets or creates the settings window, returning it in both cases.
 * There should only be one settings window
 */
export function getOrCreateSettingsWindow(): Electron.BrowserWindow {
  return settingsWindow || createSettingsWindow();
}
