import { createTimestampSeconds } from "./lib/createTimestampSeconds";
import { createTimestampMillis } from "./lib/createTimestampMillis";
import { decodeJwt } from "./lib/decodeJwt";
import { countWords } from "./lib/countWords";
import { countChars } from "./lib/countChars";
import { ScriptExtension } from "./types";

export const scriptList: ScriptExtension[] = [
  createTimestampSeconds,
  createTimestampMillis,
  decodeJwt,
  countChars,
  countWords,
];
