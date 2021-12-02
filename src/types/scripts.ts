export type ScriptHandler = (text: string) => string;

export type ScriptExtension = {
  key: string;
  label: string;
  handler: ScriptHandler;
  append?: boolean;
};

export type ScriptCollection = { [key: string]: ScriptExtension };
export type ScriptList = ScriptExtension[];
