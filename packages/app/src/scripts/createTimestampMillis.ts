import { ScriptHandler, ScriptOptions } from "./index";

const key = "create-timestamp-millis";
const label = "Create Timestamp in Milliseconds (13 digits)";
const options: ScriptOptions = {
  append: true,
};

const handler: ScriptHandler = () => ({ content: [Date.now().toString()] });

export const createTimestampMillis = {
  key,
  label,
  handler,
  options,
};
