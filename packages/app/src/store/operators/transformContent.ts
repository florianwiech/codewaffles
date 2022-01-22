import { MonoTypeOperatorFunction, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EditorTransform } from "../types";
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

export function transformContent(): MonoTypeOperatorFunction<EditorTransform> {
  return pipe(
    filter(({ view }) => isSingleCursorWithoutSelection(view)),

    map((params) => {
      const result = execScript(params.command.key, [
        getEditorDocument(params.view),
      ]);
      const script = result?.content ? result?.content[0] : undefined;

      const tr = script
        ? buildTransaction(
            params.view,
            isAppendableScript(params.command.key)
              ? createAppendContentTransaction(
                  getSingleCursorPosition(params.view),
                  script,
                )
              : createReplaceContentTransaction(
                  getEditorDocumentLength(params.view),
                  script,
                ),
          )
        : undefined;

      return {
        ...params,
        tr,
        notification: result.notification,
      };
    }),
  );
}
