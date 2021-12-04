import { EditorView } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { isPerformTransformCommand, PerformTransformCommand } from "./command";

export type EditorTransform = {
  command: PerformTransformCommand;
  view: EditorView;
  script?: string | string[];
  tr?: Transaction;
};

export const isEditorTransform = (value: object): value is EditorTransform =>
  (value as EditorTransform).view !== null &&
  isPerformTransformCommand((value as EditorTransform).command);

export const hasEditorView = (
  value: object,
): value is { view: EditorView; [key: string]: any } =>
  (value as EditorTransform).view !== null;
