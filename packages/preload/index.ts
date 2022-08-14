import { contextBridge } from "electron";
import { main } from "./app-preload";
import { settings } from "./settings-preload";

if (process.argv.includes("editor")) {
  contextBridge.exposeInMainWorld("main", main);
}
if (process.argv.includes("settings")) {
  contextBridge.exposeInMainWorld("settings", settings);
}
