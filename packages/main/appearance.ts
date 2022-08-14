import { ipcMain, nativeTheme } from "electron";
import { AppearanceState } from "../shared/appearance-state";
import { IpcEvents } from "../shared/ipc-events";

export function setupAppearanceHandler() {
  ipcMain.handle(IpcEvents.CHANGE_APPEARANCE, (event, next: AppearanceState) => {
    if (next !== AppearanceState.SYSTEM && next !== AppearanceState.DARK && next !== AppearanceState.LIGHT) return;

    nativeTheme.themeSource = next;
    return nativeTheme.shouldUseDarkColors;
  });
}
