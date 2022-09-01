import { ScriptHandler } from "../types";

const key = "decode-base64";
const label = "Decode Base64";

const handler: ScriptHandler = (slices) => {
  const content = slices.map((text) => atob(text));

  return { content };
};

export const decodeBase64 = {
  key,
  label,
  handler,
};
