import { NotificationStatus, ScriptHandler } from "../types";

const key = "count-chars";
const label = "Count Characters";

const handler: ScriptHandler = (slices) => {
  const count = slices.reduce((count, slice) => {
    return count + slice.length;
  }, 0);

  return {
    notification: {
      type: NotificationStatus.INFO,
      message: `${count} chars`,
    },
  };
};

export const countChars = {
  key,
  label,
  handler,
};
