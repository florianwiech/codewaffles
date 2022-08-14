import { BrowserWindow, nativeTheme } from "electron";
import { URL } from "url";
import { join } from "path";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";

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
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 320,
    titleBarStyle: process.platform === "darwin" ? "hidden" : undefined,
    acceptFirstMouse: true,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? dark.canvas.default : light.canvas.default,
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
  browserWindow = new BrowserWindow(getMainWindowOptions());

  browserWindow.webContents.once("dom-ready", () => {
    browserWindow?.show();
    browserWindow?.focus();
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
