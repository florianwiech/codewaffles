import { BrowserWindow } from "electron";

declare const SETTINGS_WINDOW_WEBPACK_ENTRY: string;
declare const SETTINGS_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const isDevMode = () => process.env.NODE_ENV !== "production";

export let settingsWindow: BrowserWindow | null = null;

/**
 * Gets default options for the main window
 */
export function getSettingsWindowOptions(): Electron.BrowserWindowConstructorOptions {
  return {
    width: isDevMode() ? 1357 : 570,
    height: 600,
    titleBarStyle: process.platform === "darwin" ? "hidden" : undefined,
    acceptFirstMouse: true,
    // backgroundColor: "#1d2427", // todo insert correct color based on appearance
    fullscreenable: false,
    resizable: false,
    show: false,
    webPreferences: {
      preload: SETTINGS_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  };
}

/**
 * Creates a settings window.
 */
export function createSettingsWindow(): Electron.BrowserWindow {
  settingsWindow = new BrowserWindow(getSettingsWindowOptions());

  // and load the index.html of the app.
  settingsWindow.loadURL(SETTINGS_WINDOW_WEBPACK_ENTRY).then();

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

  return settingsWindow;
}

/**
 * Gets or creates the settings window, returning it in both cases.
 * There should only be one settings window
 */
export function getOrCreateSettingsWindow(): Electron.BrowserWindow {
  return settingsWindow || createSettingsWindow();
}
