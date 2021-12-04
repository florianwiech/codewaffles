import { OperatorFunction, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EditorTransform, EditorTransformResult } from "../../types";
import {
  buildTransaction,
  createAppendContentTransaction,
  createReplaceContentTransaction,
  getEditorDocument,
  getEditorDocumentLength,
  getSingleCursorPosition,
  isSingleCursorWithoutSelection,
} from "../../editor";
import { execScript, isAppendableScript } from "../../scripts";

export function transformContent(): OperatorFunction<
  EditorTransform,
  EditorTransformResult
> {
  return pipe(
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
}
