import { scriptList } from "./scriptList";
import { ScriptExtension } from "./types";

const reducer = (result: object, item: ScriptExtension) => ({
  ...result,
  [item.key]: item,
});

export type ScriptCollection = { [key: string]: ScriptExtension };
export const scriptCollection: ScriptCollection = scriptList.reduce(reducer, {});
