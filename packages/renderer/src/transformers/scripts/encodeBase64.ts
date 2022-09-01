import { ScriptHandler } from "../types";

const key = "encode-base64";
const label = "Encode Base64";

const handler: ScriptHandler = (slices) => {
  const content = slices.map((text) => btoa(text));

  return { content };
};

export const encodeBase64 = {
  key,
  label,
  handler,
};
