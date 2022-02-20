import { BrowserWindow, dialog, ipcMain } from "electron";
import { Notification, NotificationStatus } from "@codewaffle/domain";
import { IpcEvents } from "../ipc-events";

export function setupWindowNotifications() {
  ipcMain.on(IpcEvents.OPEN_NOTIFICATION, (event, notification: Notification) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    switch (notification.type) {
      case NotificationStatus.DANGER:
        dialog.showErrorBox("Transform error", notification.message);
        break;
      default:
        dialog
          .showMessageBox(win, {
            message: notification.message,
          })
          .then();
    }
  });
}
