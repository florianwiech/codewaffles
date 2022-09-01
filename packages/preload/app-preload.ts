import { ipcRenderer } from "electron";
import type { IMain } from "../../types/window";
import { IpcEvents } from "../shared/ipc-events";
import { apiBasics } from "./api-basics";

export const main: IMain = {
  ...apiBasics,
  onAutoUpdate: (callback) => {
    ipcRenderer.on("DEBUG_ON_AUTO_UPDATE", callback);
  },
  onLanguageActivation: (callback) => {
    ipcRenderer.on(IpcEvents.CHANGED_LANGUAGE_SET, callback);
  },
};
