import { BehaviorSubject, filter, map, merge, tap } from "rxjs";
import { EditorView } from "@codemirror/view";
import { EditorTransform, isEditorView } from "../types";
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

const editorTransform$ = performTransform$.pipe(
  map((command) => ({ command })),

  filter(() => isEditorView(editor$.getValue())),
  map((params): EditorTransform => ({ ...params, view: editor$.getValue()! })),
);

export const transformContent$ = editorTransform$.pipe(
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

export const transformRanges$ = editorTransform$.pipe(
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
