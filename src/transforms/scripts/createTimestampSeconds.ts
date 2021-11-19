const key = "create-timestamp-seconds";
const label = "Create timestamp (10-digit | in seconds)";
const version = 1;

const handler = () => Math.floor(Date.now() / 1000).toString();

export const createTimestampSeconds = {
  key,
  label,
  version,
  handler,
};
