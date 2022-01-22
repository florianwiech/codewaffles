import { scriptCollection } from "./scriptCollection";

export function isAppendableScript(key: string) {
  return !!scriptCollection[key]?.options?.append;
}
