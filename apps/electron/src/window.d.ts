import { Platform } from "process";

export interface IApi {
  platform: Platform;
}

declare global {
  interface Window {
    api: IApi;
  }
}
