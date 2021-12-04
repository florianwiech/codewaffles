import { EditorView } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { PerformTransformCommand } from "./command";

export type EditorTransform = {
  command: PerformTransformCommand;
  view: EditorView;
  script?: string | string[];
  tr?: Transaction;
};

export const isEditorViewDefined = (param: {
  command: PerformTransformCommand;
  view: EditorView | null;
}): param is EditorTransform => (param as EditorTransform).view !== null;
