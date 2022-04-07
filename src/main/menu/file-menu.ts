import { MenuItemConstructorOptions } from "electron";
import { createMainWindow } from "../windows/main-window";
import { getCheckForUpdatesItem, getPreferencesItems, getQuitItems } from "./shared-menu-items";

export function getFileMenu(): MenuItemConstructorOptions {
  const submenu: MenuItemConstructorOptions[] = [
    {
      label: "New Window",
      click: () => createMainWindow(),
      accelerator: "CmdOrCtrl+N",
    },
    {
      label: "Close",
      accelerator: "CmdOrCtrl+W",
      role: "close",
    },
  ];

  // macOS has these items in the "CodeWaffle" menu
  if (process.platform !== "darwin") {
    submenu.unshift(...getCheckForUpdatesItem(), { type: "separator" });
    submenu.splice(submenu.length, 0, ...getPreferencesItems(), ...getQuitItems());
  }

  return {
    label: "File",
    submenu,
  };
}
