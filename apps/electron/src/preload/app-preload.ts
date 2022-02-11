import { contextBridge } from "electron";
import type { IApi } from "../window";

const api: IApi = {
  platform: process.platform,
};

contextBridge.exposeInMainWorld("api", api);
