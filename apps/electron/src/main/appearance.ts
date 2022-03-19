import { ipcMain, nativeTheme } from "electron";
import { AppearanceState } from "../renderer/components/theme";
import { IpcEvents } from "../ipc-events";

export function setupAppearanceHandler() {
  ipcMain.handle(IpcEvents.CHANGE_APPEARANCE, (event, next: AppearanceState) => {
    if (next !== AppearanceState.SYSTEM && next !== AppearanceState.DARK && next !== AppearanceState.LIGHT) return;

    nativeTheme.themeSource = next;
    return nativeTheme.shouldUseDarkColors;
  });
}
