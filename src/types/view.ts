import { EditorView } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { PerformTransformCommand } from "./command";

export type EditorTransform = {
  command: PerformTransformCommand;
  view: EditorView;
  script?: string | string[];
  tr?: Transaction;
};

type MightHaveEditorView<T> = T & { view?: EditorView | null };
type HasEditorView<T> = T & { view: EditorView };

export function hasEditorView<T>(
  value: MightHaveEditorView<T>,
): value is HasEditorView<T> {
  return value.view !== null;
}
