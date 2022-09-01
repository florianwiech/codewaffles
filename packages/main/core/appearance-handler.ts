import { ipcMain, nativeTheme } from "electron";
import { AppearanceState } from "../../shared/appearance-state";
import { IpcEvents } from "../../shared/ipc-events";
import { state } from "../state/global/state";

export function setupAppearanceHandler() {
  nativeTheme.themeSource = state.get("appearance");

  ipcMain.handle(IpcEvents.CHANGE_APPEARANCE, (event, next: AppearanceState) => {
    if (next !== AppearanceState.SYSTEM && next !== AppearanceState.DARK && next !== AppearanceState.LIGHT) return;

    nativeTheme.themeSource = next;
    state.set("appearance", next);

    return nativeTheme.shouldUseDarkColors;
  });
}
