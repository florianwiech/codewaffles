import { MenuItemConstructorOptions } from "electron";
import { getOrCreateSettingsWindow } from "../windows/settings-window";

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