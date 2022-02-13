import { contextBridge } from "electron";
import type { IApi } from "../window";
import { apiBasics } from "./api-basics";

const api: IApi = {
  ...apiBasics,
};

contextBridge.exposeInMainWorld("api", api);
