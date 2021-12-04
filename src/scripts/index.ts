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
  {},
);

export function execScript(key: string, content: string) {
  const { handler } = scriptCollection[key];
  return handler(content);
}

export function isAppendableScript(key: string) {
  return scriptCollection[key].append;
}
