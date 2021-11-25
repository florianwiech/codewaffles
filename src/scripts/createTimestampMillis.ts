const key = "create-timestamp-millis";
const label = "Create timestamp - milliseconds (13 digits)";

const handler = () => Date.now().toString();

export const createTimestampMillis = {
  key,
  label,
  handler,
  append: true,
};
