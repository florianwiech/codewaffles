import { BehaviorSubject, merge } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { EditorView } from "@codemirror/view";
import { combineLatestObject } from "rxjs-etc";
import { isEditorView } from "../types";
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
import { closeSearch$, performTransform$ } from "./command";

export const editor$ = new BehaviorSubject<EditorView | null>(null);

export const view$ = editor$.pipe(filter(isEditorView));

export const performTransformExtended$ = combineLatestObject({
  command: performTransform$,
  view: view$,
});

export const closeSearchExtended$ = combineLatestObject({
  command: closeSearch$,
  view: view$,
});

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

export const transforms$ = merge(transformContent$, transformRanges$).pipe(
  tap(({ view, tr }) => view.dispatch(tr)),
);

export const editorChanges$ = merge(closeSearchExtended$, transforms$).pipe(
  tap(({ view }) => view.focus()),
);
