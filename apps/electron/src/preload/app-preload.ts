import { contextBridge, ipcRenderer } from "electron";
import type { IApp } from "../window";
import { IpcEvents } from "../ipc-events";
import { apiBasics } from "./api-basics";

const api: IApp = {
  ...apiBasics,
  openNotification: (notification) => ipcRenderer.send(IpcEvents.OPEN_NOTIFICATION, notification),
};

contextBridge.exposeInMainWorld("api", api);
