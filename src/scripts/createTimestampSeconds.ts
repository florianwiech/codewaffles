const key = "create-timestamp-seconds";
const label = "Create timestamp - seconds (10 digits)";

const handler = () => Math.floor(Date.now() / 1000).toString();

export const createTimestampSeconds = {
  key,
  label,
  handler,
  append: true,
};
