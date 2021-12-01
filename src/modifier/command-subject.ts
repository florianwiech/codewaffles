import {
  concatMap,
  filter,
  map,
  mergeMap,
  OperatorFunction,
  Subject,
  tap,
} from "rxjs";
import { EditorSelection } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { Command, CommandTypes, isPerformTransformCommand } from "../types";
import { scriptCollection } from "../scripts";
import { editorDocument$, view$ } from "../editor/setup/view-subject";

export const command$ = new Subject<Command>();

export const closeSearch$ = command$.pipe(
  filter(({ type }) => type === CommandTypes.SEARCH_CLOSED)
);

export const performTransform$ = command$.pipe(
  filter((command) => isPerformTransformCommand(command))
);

export function scriptHandler(
  view: EditorView
): OperatorFunction<Command, string> {
  return (source) =>
    source.pipe(
      map(({ key }) => scriptCollection[key]),
      concatMap(async ({ handler }) => await handler(view.state.doc.toString()))
    );
}

export const scriptResult$ = performTransform$.pipe(
  map(({ key }) => scriptCollection[key]),
  mergeMap((command) =>
    editorDocument$.pipe(map((document) => ({ ...command, document })))
  ),
  concatMap(async ({ handler, document }) =>
    document ? await handler(document) : ""
  ),
  tap((some) => console.log("hmm", some))
);

export const editorDispatch$ = scriptResult$.pipe(
  tap((result) => console.log("executed transform", result)),
  mergeMap((result) => view$.pipe(map((view) => ({ result, view })))),
  map(({ result, view }) => ({
    view,
    spec: {
      changes: { from: 0, to: view?.state.doc.length, insert: result },
      selection: EditorSelection.cursor(result.length),
    },
  })),
  map(({ view, spec }) => ({ view, tr: view?.state.update(spec) || {} })),
  tap(({ view, tr }) => view?.dispatch(tr)),
  tap(({ view }) => view?.focus()),
  tap((result) => console.log("WEOO", result))
);
