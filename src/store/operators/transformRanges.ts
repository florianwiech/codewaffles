import { MonoTypeOperatorFunction, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EditorTransform } from "../types";
import {
  buildTransaction,
  createSelectionRangesSpec,
  isSingleCursorWithoutSelection,
} from "../../editor";

export function transformRanges(): MonoTypeOperatorFunction<EditorTransform> {
  return pipe(
    filter(({ view }) => !isSingleCursorWithoutSelection(view)),

    map((params) => {
      const { command, view } = params;

      const { spec, notification } = createSelectionRangesSpec(
        view,
        command.key,
      );

      return {
        ...params,
        tr: spec ? buildTransaction(view, spec) : undefined,
        notification,
      };
    }),
  );
}
