import { createTimestampSeconds } from "./scripts/createTimestampSeconds";
import { createTimestampMillis } from "./scripts/createTimestampMillis";
import { decodeJwt } from "./scripts/decodeJwt";
import { countWords } from "./scripts/countWords";
import { countChars } from "./scripts/countChars";
import { ScriptExtension } from "./types";
import { encodeBase64 } from "./scripts/encodeBase64";
import { decodeBase64 } from "./scripts/decodeBase64";

export const scriptList: ScriptExtension[] = [
  createTimestampSeconds,
  createTimestampMillis,
  decodeJwt,
  countChars,
  countWords,
  encodeBase64,
  decodeBase64,
];
