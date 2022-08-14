import type { MenuItemConstructorOptions } from "electron";
import { app, Menu } from "electron";
import { getEditMenu } from "./edit-menu";
import { getFileMenu } from "./file-menu";
import { getViewMenu } from "./view-menu";
import { getWindowMenu } from "./window-menu";
import { getHelpMenu } from "./help-menu";
import { getAppMenu } from "./macos-app-menu";

/**
 * Creates the app's window menu.
 */
export function setupMenu() {
  const menu: MenuItemConstructorOptions[] = [
    getFileMenu(),
    getEditMenu(),
    getViewMenu(),
    getWindowMenu(),
    getHelpMenu(),
  ];

  if (process.platform === "darwin") {
    const { name } = app;
    menu.unshift(getAppMenu(name));
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}
