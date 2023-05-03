import { BrowserWindow, nativeTheme } from "electron";
import { URL } from "url";
import { join } from "node:path";
import { isDevMode } from "../utils/devmode";
import { windowObserver } from "../state/window-observer";
import { state } from "../state/global/state";

// Keep a global reference of the window objects, if we don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let browserWindows: Array<BrowserWindow | null> = [];

/**
 * URL for main window.
 * Vite dev server for development.
 * `file://../renderer/index.html` for production and test
 */
const pageUrl =
  import.meta.env.DEV && import.meta.env.VITE_EDITOR_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_EDITOR_DEV_SERVER_URL
    : new URL("./renderer/editor.html", "file://" + __dirname).toString();

const preloadPath = join(__dirname, "../preload/index.cjs");

/**
 * Gets default options for the main window
 */
export function getMainWindowOptions(): Electron.BrowserWindowConstructorOptions {
  return {
    minHeight: 600,
    minWidth: 320,
    titleBarStyle: process.platform === "darwin" ? "hidden" : undefined,
    acceptFirstMouse: true,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#0d1117" : "#ffffff",
    webPreferences: {
      preload: preloadPath,
      additionalArguments: ["common", "editor"],
    },
  };
}

/**
 * Creates a new main window.
 */
export function createMainWindow(): Electron.BrowserWindow {
  let browserWindow: BrowserWindow | null;

  const windowStateObserver = windowObserver({
    defaultWidth: 800,
    defaultHeight: 600,
    getState: () => state.get("windowsState.home"),
    setState: (s) => state.set("windowsState.home", s),
  });

  browserWindow = new BrowserWindow({
    ...getMainWindowOptions(),
    ...windowStateObserver.rectangle,
  });

  browserWindow.webContents.once("dom-ready", () => {
    if (browserWindow) windowStateObserver.manage(browserWindow);
    browserWindow?.show();
    browserWindow?.focus();

    if (isDevMode()) {
      browserWindow?.webContents.openDevTools();
    }
  });

  browserWindow.on("closed", () => {
    browserWindows = browserWindows.filter((bw) => browserWindow !== bw);

    browserWindow = null;
  });

  browserWindow.loadURL(pageUrl).then();

  browserWindows.push(browserWindow);

  return browserWindow;
}

/**
 * Gets or creates the main window, returning it in both cases.
 */
export function getOrCreateMainWindow(): Electron.BrowserWindow {
  return BrowserWindow.getFocusedWindow() || browserWindows[0] || createMainWindow();
}
