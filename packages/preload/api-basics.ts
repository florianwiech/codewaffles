import { ipcRenderer } from "electron";
import { IpcEvents } from "../shared/ipc-events";
import type { IApi } from "../../types/window";

export const apiBasics: IApi = {
  platform: process.platform,
  onTitleBarClick: () => ipcRenderer.send(IpcEvents.CLICK_TITLEBAR_MAC),
  getActiveLanguages: () => ipcRenderer.invoke(IpcEvents.GET_LANGUAGES),
};
