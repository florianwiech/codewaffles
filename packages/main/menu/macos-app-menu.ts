import type { MenuItemConstructorOptions } from "electron";
import { app } from "electron";
import { getCheckForUpdatesItem, getPreferencesItems } from "./shared-menu-items";

export function getAppMenu(name: string): MenuItemConstructorOptions {
  return {
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about",
      },
      ...getCheckForUpdatesItem(),
      ...getPreferencesItems(),
      {
        label: "Services",
        role: "services",
        submenu: [],
      },
      {
        type: "separator",
      },
      {
        label: "Hide " + name,
        accelerator: "Command+H",
        role: "hide",
      },
      {
        label: "Hide Others",
        accelerator: "Command+Shift+H",
        role: "hideOthers",
      },
      {
        label: "Show All",
        role: "unhide",
      },
      {
        type: "separator",
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: function () {
          app.quit();
        },
      },
    ],
  };
}
