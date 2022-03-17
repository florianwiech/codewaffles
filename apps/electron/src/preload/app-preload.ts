import { contextBridge, ipcRenderer } from "electron";
import type { IMain } from "../window";
import { IpcEvents } from "../ipc-events";
import { apiBasics } from "./api-basics";

const main: IMain = {
  ...apiBasics,
  openNotification: (notification) => ipcRenderer.send(IpcEvents.OPEN_NOTIFICATION, notification),
};

contextBridge.exposeInMainWorld("main", main);
