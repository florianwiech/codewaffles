import { contextBridge } from "electron";
import type { IMain } from "../window";
import { apiBasics } from "./api-basics";

const main: IMain = {
  ...apiBasics,
};

contextBridge.exposeInMainWorld("main", main);
