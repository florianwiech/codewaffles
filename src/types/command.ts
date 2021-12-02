export enum CommandTypes {
  SEARCH_CLOSED = "search-closed",
  PERFORM_TRANSFORM = "perform-transform",
}

export type Command = {
  type: CommandTypes;
  [key: string]: any;
};

export type PerformTransformCommand = Command & { key: string };

export const isPerformTransformCommand = (
  command: Command
): command is PerformTransformCommand =>
  command.type === CommandTypes.PERFORM_TRANSFORM;
