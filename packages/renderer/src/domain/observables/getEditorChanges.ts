import { combineLatest, merge, Observable, Subject } from "rxjs";
import { EditorView } from "@codemirror/view";
import { filter, tap } from "rxjs/operators";
// import { tag } from "rxjs-spy/operators";
import { Command, CommandTypes, isPerformTransformCommand, Notification } from "../types";
import { transformContent, transformRanges } from "../operators";

export type GetEditorChangesParams = {
  command$: Observable<Command>;
  notification$: Subject<Notification | null>;
  view$: Observable<EditorView>;
};

export const getEditorChanges = ({ command$, notification$, view$ }: GetEditorChangesParams) => {
  const closeSearch$ = command$.pipe(filter(({ type }) => type === CommandTypes.SEARCH_CLOSED));

  const performTransform$ = command$.pipe(filter(isPerformTransformCommand));

  const editorTransform$ = combineLatest([performTransform$, view$], (command, view) => ({ command, view }));

  const transforms$ = merge(editorTransform$.pipe(transformContent()), editorTransform$.pipe(transformRanges())).pipe(
    tap(({ view, tr }) => tr && view.dispatch(tr)),
    tap(({ notification }) => (notification ? notification$.next(notification) : undefined)),
    // tag("transforms$"),
  );

  const closeSearchExtended$ = combineLatest([closeSearch$, view$], (command, view) => ({ command, view }));

  return merge(closeSearchExtended$, transforms$).pipe(
    tap(({ view }) => view.focus()),
    // tag("editor-changes"),
  );
};
