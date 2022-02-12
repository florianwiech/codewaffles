import { contextBridge, ipcRenderer } from "electron";
import { IpcEvents } from "../ipc-events";
import { AppearanceState } from "../types";
import type { ISettings } from "../window";
import { apiBasics } from "./api-basics";

const api: ISettings = {
  ...apiBasics,
  changeAppearance: (next: AppearanceState) => ipcRenderer.invoke(IpcEvents.CHANGE_APPEARANCE, next),
};

contextBridge.exposeInMainWorld("settings", api);
