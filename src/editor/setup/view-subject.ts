import { BehaviorSubject, filter, map } from "rxjs";
import { EditorView } from "@codemirror/view";

export const view$ = new BehaviorSubject<EditorView | null>(null);

export const editorDocument$ = view$.pipe(
  map((view) => view?.state.doc.toString())
);
