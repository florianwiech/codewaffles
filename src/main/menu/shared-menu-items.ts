import { app, MenuItemConstructorOptions } from "electron";
import { getOrCreateSettingsWindow } from "../windows/settings-window";
import { checkForUpdates, checkUpdateMenuItemEnabled, checkUpdateMenuItemLabel } from "../auto-update";

export function getCheckForUpdatesItem(): Array<MenuItemConstructorOptions> {
  return [
    { label: `Version ${app.getVersion()}`, enabled: false },
    {
      label: checkUpdateMenuItemLabel,
      enabled: checkUpdateMenuItemEnabled,
      click: () => checkForUpdates({ silent: false }),
    },
  ];
}

/**
 * Depending on the OS, the `Preferences` either go into the `CodeWaffle`
 * menu (macOS) or under `File` (Linux, Windows)
 */
export function getPreferencesItems(): Array<MenuItemConstructorOptions> {
  return [
    {
      type: "separator",
    },
    {
      label: "Preferences",
      accelerator: "CmdOrCtrl+,",
      click() {
        getOrCreateSettingsWindow().focus();
      },
    },
    {
      type: "separator",
    },
  ];
}

/**
 * Depending on the OS, the `Quit` either go into the `CodeWaffle`
 * menu (macOS) or under `File` (Linux, Windows)
 */
export function getQuitItems(): Array<MenuItemConstructorOptions> {
  return [
    {
      type: "separator",
    },
    {
      role: "quit",
    },
  ];
}
