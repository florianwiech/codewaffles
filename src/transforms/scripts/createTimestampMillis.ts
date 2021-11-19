const key = "create-timestamp-millis";
const label = "Create timestamp (13-digit | with millis)";
const version = 1;

const handler = () => Date.now().toString();

export const createTimestampMillis = {
  key,
  label,
  version,
  handler,
};
