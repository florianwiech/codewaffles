export type ScriptHandler = () => string;

export type TransformDefinition = {
  key: string;
  label: string;
  version: number;
  handler: ScriptHandler;
};

export type TransformObject = { [key: string]: TransformDefinition };
export type TransformList = TransformDefinition[];
