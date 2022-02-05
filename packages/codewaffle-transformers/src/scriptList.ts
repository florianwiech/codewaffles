import { createTimestampSeconds } from "./scripts/createTimestampSeconds";
import { createTimestampMillis } from "./scripts/createTimestampMillis";
import { decodeJwt } from "./scripts/decodeJwt";
import { countWords } from "./scripts/countWords";
import { countChars } from "./scripts/countChars";
import { ScriptExtension } from "./types";

export const scriptList: ScriptExtension[] = [
  createTimestampSeconds,
  createTimestampMillis,
  decodeJwt,
  countChars,
  countWords,
];
