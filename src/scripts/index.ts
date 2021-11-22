import { ScriptCollection, ScriptExtension, ScriptList } from "../types";
import { createTimestampSeconds } from "./createTimestampSeconds";
import { createTimestampMillis } from "./createTimestampMillis";
import { decodeJwt } from "./decodeJwt";

export const scriptList: ScriptList = [
  createTimestampSeconds,
  createTimestampMillis,
  decodeJwt,
];

const reducer = (result: object, item: ScriptExtension) => ({
  ...result,
  [item.key]: item,
});

export const scriptCollection: ScriptCollection = scriptList.reduce(
  reducer,
  {}
);
