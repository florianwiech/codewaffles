import { scriptCollection } from "./scriptCollection";

export function execScript(key: string, content: string[]) {
  const script = scriptCollection[key];

  if (!script) throw new Error("script not found");

  const { handler } = script;

  return handler(content);
}
