import { Platform } from "process";
import { AppearanceState } from "@codewaffle/components";
import { Notification } from "@codewaffle/domain";

export interface IApi {
  platform: Platform;
  onTitleBarClick: () => void;
}

export interface IApp extends IApi {
  openNotification: (notification: Notification) => void;
}

export interface ISettings extends IApi {
  changeAppearance: (next: AppearanceState) => Promise<boolean>;
}

declare global {
  interface Window {
    api: IApp;
    settings: ISettings;
  }
}
