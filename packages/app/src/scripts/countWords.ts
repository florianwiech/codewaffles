import { NotificationStatus } from "../store";
import { ScriptHandler } from "./index";

const key = "count-words";
const label = "Count Words";

const handler: ScriptHandler = (slices) => {
  const count = slices.reduce((count, slice) => {
    let inWord = false;
    for (let i = 0; i < slice.length; i++) {
      let word = /\w/.test(slice[i]);
      if (word && !inWord) count++;
      inWord = word;
    }
    return count;
  }, 0);

  return {
    notification: {
      type: NotificationStatus.INFO,
      message: `${count} words`,
    },
  };
};

export const countWords = {
  key,
  label,
  handler,
};
