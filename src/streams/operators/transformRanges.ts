import { OperatorFunction, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EditorTransform, EditorTransformResult } from "../../types";
import {
  buildTransaction,
  createSelectionRangesSpec,
  isSingleCursorWithoutSelection,
} from "../../editor";

export function transformRanges(): OperatorFunction<
  EditorTransform,
  EditorTransformResult
> {
  return pipe(
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
}
