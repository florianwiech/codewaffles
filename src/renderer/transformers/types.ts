export enum NotificationStatus {
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}

export type Notification = {
  type: NotificationStatus;
  message: string;
};

export type ScriptResult = { content?: string[]; notification?: Notification };
export type ScriptHandler = (slices: string[]) => ScriptResult;
export type ScriptOptions = { append?: boolean };

export type ScriptExtension = {
  key: string;
  label: string;
  handler: ScriptHandler;
  options?: ScriptOptions;
};
