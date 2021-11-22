const key = "create-timestamp-millis";
const label = "Create timestamp (millis)";

const handler = () => Date.now().toString();

export const createTimestampMillis = {
  key,
  label,
  handler,
  append: true,
};
