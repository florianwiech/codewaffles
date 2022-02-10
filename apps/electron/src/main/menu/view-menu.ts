import { BrowserWindow, MenuItemConstructorOptions } from "electron";

export function getViewMenu(): MenuItemConstructorOptions {
  return {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click: function (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: "Toggle Full Screen",
        accelerator: process.platform === "darwin" ? "Ctrl+Command+F" : "F11",
        click: function (item, focusedWindow) {
          if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        },
      },
      {
        label: "Toggle Developer Tools",
        accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click: function () {
          const browserWindow = BrowserWindow.getFocusedWindow();

          if (browserWindow && !browserWindow.isDestroyed()) {
            browserWindow.webContents.toggleDevTools();
          }
        },
      },
    ],
  };
}
