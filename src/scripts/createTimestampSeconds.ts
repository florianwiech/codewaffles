const key = "create-timestamp-seconds";
const label = "Create timestamp - seconds (10 digits)";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const handler = async () => {
  await sleep(3000);
  return Math.floor(Date.now() / 1000).toString();
};

export const createTimestampSeconds = {
  key,
  label,
  handler,
  append: true,
};
