import type { Platform } from "process";
import type { IpcRendererEvent } from "electron";
import type { AppearanceState } from "../src/renderer/components/theme";

export interface IApi {
  platform: Platform;
  onTitleBarClick: () => void;
}

export interface IMain extends IApi {
  onAutoUpdate: (callback: (event: IpcRendererEvent, message: string) => void) => void;
}

export interface ISettings extends IApi {
  changeAppearance: (next: AppearanceState) => Promise<boolean>;
}

declare global {
  interface Window {
    main?: IMain;
    settings?: ISettings;
  }
}
