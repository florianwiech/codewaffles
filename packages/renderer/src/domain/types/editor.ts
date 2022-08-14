import { EditorView } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { PerformTransformCommand } from "./command";
import { Notification } from "./notification";

export type EditorTransform = {
  command: PerformTransformCommand;
  view: EditorView;
  tr?: Transaction;
  notification?: Notification;
};

export function isEditorView(value: EditorView | null): value is EditorView {
  return value !== null;
}
