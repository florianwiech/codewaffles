import { contextBridge, ipcRenderer } from "electron";
import { IpcEvents } from "../ipc-events";
import type { IApi } from "../window";

const api: IApi = {
  platform: process.platform,
  onTitleBarClick: () => ipcRenderer.send(IpcEvents.CLICK_TITLEBAR_MAC),
};

contextBridge.exposeInMainWorld("api", api);
