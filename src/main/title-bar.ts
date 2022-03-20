import { BrowserWindow, ipcMain, IpcMainEvent, systemPreferences } from "electron";
import { IpcEvents } from "../ipc-events";

/**
 * On macOS, set up the custom titlebar click handler.
 */
export function setupTitleBarClickMac() {
  if (process.platform !== "darwin") {
    return;
  }

  ipcMain.on(IpcEvents.CLICK_TITLEBAR_MAC, (event: IpcMainEvent) => {
    const doubleClickAction = systemPreferences.getUserDefault("AppleActionOnDoubleClick", "string");
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      if (doubleClickAction === "Minimize") {
        win.minimize();
      } else if (doubleClickAction === "Maximize") {
        if (!win.isMaximized()) {
          win.maximize();
        } else {
          win.unmaximize();
        }
      }
    }
  });
}
