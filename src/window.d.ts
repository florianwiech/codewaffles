import { Platform } from "process";
import { AppearanceState } from "./renderer/components/theme";

export interface IApi {
  platform: Platform;
  onTitleBarClick: () => void;
}

export interface IMain extends IApi {}

export interface ISettings extends IApi {
  changeAppearance: (next: AppearanceState) => Promise<boolean>;
}

declare global {
  interface Window {
    main?: IMain;
    settings?: ISettings;
  }
}
