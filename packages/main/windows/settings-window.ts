import { BrowserWindow, nativeTheme } from "electron";
import { URL } from "url";
import { join } from "node:path";
import { isDevMode } from "../utils/devmode";
import { windowObserver } from "../state/window-observer";
import { state } from "../state/global/state";
import type { SettingsWindowState } from "../state/global/types";

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

const settingsWindowDimensions = { width: 420, height: 360 };

/**
 * Gets default options for the main window
 */
export function getSettingsWindowOptions(): Electron.BrowserWindowConstructorOptions {
  return {
    titleBarStyle: process.platform === "darwin" ? "hidden" : undefined,
    acceptFirstMouse: true,
    minimizable: false,
    fullscreenable: false,
    resizable: false,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#0d1117" : "#ffffff",
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
  const windowStateObserver = windowObserver({
    defaultWidth: settingsWindowDimensions.width,
    defaultHeight: settingsWindowDimensions.height,
    getState: () => {
      const windowState = state.get<"windowsState.settings", SettingsWindowState>("windowsState.settings");

      return { ...windowState, ...settingsWindowDimensions };
    },
    setState: (nextState) => {
      state.set("windowsState.settings", {
        x: nextState.x,
        y: nextState.y,
        displayBounds: nextState.displayBounds,
      });
    },
  });

  settingsWindow = new BrowserWindow({
    ...getSettingsWindowOptions(),
    ...windowStateObserver.rectangle,
  });

  settingsWindow.webContents.once("dom-ready", () => {
    if (settingsWindow) {
      windowStateObserver.manage(settingsWindow);
      settingsWindow.show();
      settingsWindow?.focus();

      if (isDevMode()) {
        // settingsWindow?.webContents.openDevTools({ mode: "detach", activate: false });
      }
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
