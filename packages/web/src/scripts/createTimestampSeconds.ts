import { ScriptHandler, ScriptOptions } from "./index";

const key = "create-timestamp-seconds";
const label = "Create Timestamp in Seconds (10 digits)";
const options: ScriptOptions = {
  append: true,
};

const handler: ScriptHandler = () => ({
  content: [Math.floor(Date.now() / 1000).toString()],
});

export const createTimestampSeconds = {
  key,
  label,
  handler,
  options,
};
