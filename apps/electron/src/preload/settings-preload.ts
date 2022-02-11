import { contextBridge, ipcRenderer } from "electron";
import { IpcEvents } from "../ipc-events";
import type { IApi } from "../window";
import { apiBasics } from "./api-basics";

const api: IApi = {
  ...apiBasics,
};

contextBridge.exposeInMainWorld("api", api);
