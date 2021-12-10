import { combineLatest, merge } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { tag } from "rxjs-spy/cjs/operators";
import { CommandTypes, isPerformTransformCommand } from "../types";
import { command$, view$ } from "../subjects";
import { transformContent, transformRanges } from "../operators";

export const getEditorChanges = (source$ = command$) => {
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
