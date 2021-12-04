import { createTimestampSeconds } from "./createTimestampSeconds";
import { createTimestampMillis } from "./createTimestampMillis";
import { decodeJwt } from "./decodeJwt";

export type ScriptHandler = (text: string) => string;
export type ScriptExtension = {
  key: string;
  label: string;
  handler: ScriptHandler;
  append?: boolean;
};

export type ScriptList = ScriptExtension[];
export const scriptList: ScriptList = [
  createTimestampSeconds,
  createTimestampMillis,
  decodeJwt,
];

const reducer = (result: object, item: ScriptExtension) => ({
  ...result,
  [item.key]: item,
});

export type ScriptCollection = { [key: string]: ScriptExtension };
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
