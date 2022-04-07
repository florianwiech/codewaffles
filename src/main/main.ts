import { app } from "electron";
import { getOrCreateMainWindow } from "./windows/main-window";
import { setupDevTools } from "./devtools";
import { setupMenu } from "./menu/setup-menu";
import { setupTitleBarClickMac } from "./title-bar";
import { setupAppearanceHandler } from "./appearance";
import { setupSecurityHandlers } from "./setup-security-handlers";
import { checkForUpdates, setupAutoUpdateHandlers } from "./auto-update";

let argv: string[] = [];

const shouldQuit = () => require("electron-squirrel-startup");

/**
 * Handle the app's "ready" event. This is essentially
 * the method that takes care of booting the application.
 */
export async function onReady() {
  // todo
  // await onFirstRunMaybe();
  setupSecurityHandlers();

  getOrCreateMainWindow();

  // todo
  // setupAboutPanel();
  setupMenu();
  setupAppearanceHandler();
  // setupMenuHandler();
  // setupDialogs();
  setupDevTools().then();
  setupTitleBarClickMac();

  // processCommandLine(argv);
  setupAutoUpdateHandlers();
  checkForUpdates({ silent: true });
}

/**
 * All windows have been closed, quit on anything but
 * macOS.
 */
export function onWindowsAllClosed() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
}

/**
 * The main method - and the first function to run
 * when app is launched.
 */
export function main(argv_in: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  argv = argv_in;

  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (shouldQuit()) {
    app.quit();
    return;
  }

  // https://www.electronjs.org/docs/latest/api/app#appenablesandbox
  app.enableSandbox();

  app.name = "CodeWaffle";

  // Launch
  app.whenReady().then(onReady);
  app.on("window-all-closed", onWindowsAllClosed);
  app.on("activate", getOrCreateMainWindow);
}

// only call main() if this is the main module
if (typeof module !== "undefined" && require.main === module) {
  main(process.argv);
}
