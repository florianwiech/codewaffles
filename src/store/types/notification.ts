export enum NotificationStatus {
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}

export type Notification = {
  type: NotificationStatus;
  message: string;
};
