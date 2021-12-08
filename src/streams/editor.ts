import { BehaviorSubject, combineLatest, merge } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { EditorView } from "@codemirror/view";
import { tag } from "rxjs-spy/cjs/operators";
import { isEditorView } from "./types";
import { closeSearch$, performTransform$ } from "./command";
import { transformContent, transformRanges } from "./operators";

export const editor$ = new BehaviorSubject<EditorView | null>(null);

export const view$ = editor$.pipe(filter(isEditorView));

export const editorTransform$ = combineLatest(
  [performTransform$, view$],
  (command, view) => ({ command, view }),
);

export const transforms$ = merge(
  editorTransform$.pipe(transformContent()),
  editorTransform$.pipe(transformRanges()),
).pipe(tap(({ view, tr }) => view.dispatch(tr)));

export const closeSearchExtended$ = combineLatest(
  [closeSearch$, view$],
  (command, view) => ({ command, view }),
);

export const editorChanges$ = merge(closeSearchExtended$, transforms$).pipe(
  tap(({ view }) => view.focus()),
  tag("editor-changes"),
);
