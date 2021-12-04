import { BehaviorSubject, combineLatest, filter, map, merge, tap } from "rxjs";
import { EditorView } from "@codemirror/view";
import { isEditorViewDefined } from "../types";
import { execScript, isAppendableScript } from "../scripts";
import {
  buildTransaction,
  createAppendContentTransaction,
  createReplaceContentTransaction,
  createSelectionRangesSpec,
  getEditorDocument,
  getEditorDocumentLength,
  getSingleCursorPosition,
  isSingleCursorWithoutSelection,
} from "../editor";
import { performTransform$ } from "./command";

export const editor$ = new BehaviorSubject<EditorView | null>(null);

const performTransformExtended$ = combineLatest([
  performTransform$,
  editor$,
]).pipe(
  map(([command, view]) => ({ command, view })),
  filter(isEditorViewDefined),
);

export const transformContent$ = performTransformExtended$.pipe(
  filter(({ view }) => isSingleCursorWithoutSelection(view)),

  map((params) => ({
    ...params,
    script: execScript(params.command.key, getEditorDocument(params.view)),
  })),

  map((params) => ({
    ...params,
    tr: buildTransaction(
      params.view,
      isAppendableScript(params.command.key)
        ? createAppendContentTransaction(
            getSingleCursorPosition(params.view),
            params.script,
          )
        : createReplaceContentTransaction(
            getEditorDocumentLength(params.view),
            params.script,
          ),
    ),
  })),
);

export const transformRanges$ = performTransformExtended$.pipe(
  filter(({ view }) => !isSingleCursorWithoutSelection(view)),

  map((params) => {
    const { command, view } = params;

    const { spec, script } = createSelectionRangesSpec(view, command.key);

    return {
      ...params,
      script,
      tr: buildTransaction(view, spec),
    };
  }),
);

export const transform$ = merge(transformContent$, transformRanges$).pipe(
  tap(({ view, tr }) => view.dispatch(tr)),
  tap(({ view }) => view.focus()),
);
