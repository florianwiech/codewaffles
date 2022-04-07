import { contextBridge, ipcRenderer } from "electron";
import type { IMain } from "../window";
import { apiBasics } from "./api-basics";

const main: IMain = {
  ...apiBasics,
  onAutoUpdate: (callback) => {
    ipcRenderer.on("DEBUG_ON_AUTO_UPDATE", callback);
  },
};

contextBridge.exposeInMainWorld("main", main);
