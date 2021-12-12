import { Notification } from "../store";
import { createTimestampSeconds } from "./createTimestampSeconds";
import { createTimestampMillis } from "./createTimestampMillis";
import { decodeJwt } from "./decodeJwt";

export type ScriptResult = { content?: string[]; notification?: Notification };
export type ScriptHandler = (slices: string[]) => ScriptResult;
export type ScriptOptions = { append?: boolean };
export type ScriptExtension = {
  key: string;
  label: string;
  handler: ScriptHandler;
  options?: ScriptOptions;
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

export function execScript(key: string, content: string[]) {
  const script = scriptCollection[key];

  if (!script) throw new Error("script not found");

  const { handler } = script;

  return handler(content);
}

export function isAppendableScript(key: string) {
  return !!scriptCollection[key]?.options?.append;
}
