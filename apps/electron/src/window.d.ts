import { Platform } from "process";
import { AppearanceState } from "@codewaffle/components";
import { Notification } from "@codewaffle/domain";

export interface IApi {
  platform: Platform;
  onTitleBarClick: () => void;
}

export interface IMain extends IApi {
  openNotification: (notification: Notification) => void;
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
