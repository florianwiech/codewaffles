import { ipcMain, nativeTheme } from "electron";
import { IpcEvents } from "../ipc-events";
import { AppearanceState } from "../types";

export function setupAppearanceHandler() {
  ipcMain.handle(IpcEvents.CHANGE_APPEARANCE, (event, next: AppearanceState) => {
    if (next !== AppearanceState.SYSTEM && next !== AppearanceState.DARK && next !== AppearanceState.LIGHT) return;

    nativeTheme.themeSource = next;
    return nativeTheme.shouldUseDarkColors;
  });
}
