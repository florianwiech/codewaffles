import { ipcRenderer } from "electron";
import { IpcEvents } from "../ipc-events";
import type { IApi } from "../window";

export const apiBasics: Pick<IApi, "platform" | "onTitleBarClick"> = {
  platform: process.platform,
  onTitleBarClick: () => ipcRenderer.send(IpcEvents.CLICK_TITLEBAR_MAC),
};
