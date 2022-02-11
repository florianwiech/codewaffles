import { Platform } from "process";

export interface IApi {
  platform: Platform;
  onTitleBarClick: () => void;
}

declare global {
  interface Window {
    api: IApi;
  }
}
