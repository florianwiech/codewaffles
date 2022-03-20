import { contextBridge, ipcRenderer } from "electron";
import { AppearanceState } from "../renderer/components/theme";
import { IpcEvents } from "../ipc-events";
import type { ISettings } from "../window";
import { apiBasics } from "./api-basics";

const api: ISettings = {
  ...apiBasics,
  changeAppearance: (next: AppearanceState) => ipcRenderer.invoke(IpcEvents.CHANGE_APPEARANCE, next),
};

contextBridge.exposeInMainWorld("settings", api);
