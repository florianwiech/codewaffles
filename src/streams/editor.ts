import { BehaviorSubject, combineLatest, merge, Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { EditorView } from "@codemirror/view";
import { tag } from "rxjs-spy/cjs/operators";
import {
  Command,
  CommandTypes,
  isEditorView,
  isPerformTransformCommand,
} from "./types";
import { closeSearch$, command$, performTransform$ } from "./command";
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

export const getEditorChanges = (source$: Observable<Command>) => {
  const closeSearch$ = source$.pipe(
    filter(({ type }) => type === CommandTypes.SEARCH_CLOSED),
  );

  const performTransform$ = source$.pipe(filter(isPerformTransformCommand));

  const editorTransform$ = combineLatest(
    [performTransform$, view$],
    (command, view) => ({ command, view }),
  );

  const transforms$ = merge(
    editorTransform$.pipe(transformContent()),
    editorTransform$.pipe(transformRanges()),
  ).pipe(tap(({ view, tr }) => view.dispatch(tr)));

  const closeSearchExtended$ = combineLatest(
    [closeSearch$, view$],
    (command, view) => ({ command, view }),
  );

  return merge(closeSearchExtended$, transforms$).pipe(
    tap(({ view }) => view.focus()),
    tag("editor-changes"),
  );
};
