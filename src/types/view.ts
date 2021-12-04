import { EditorView } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { PerformTransformCommand } from "./command";

export type EditorTransform = {
  command: PerformTransformCommand;
  view: EditorView;
  script?: string | string[];
  tr?: Transaction;
};

export const isEditorView = (view: EditorView | null): view is EditorView =>
  view !== null;
