import { EditorView } from "@codemirror/view";
import { EditorSelection, SelectionRange, TransactionSpec } from "@codemirror/state";
import { execScript, ScriptResult } from "../transformers";
import { NotificationStatus } from "./types";

export const getEditorDocument = (view: EditorView) => view.state.doc.toString();

export const getEditorDocumentLength = (view: EditorView) => view.state.doc.length;

export const isSingleCursorWithoutSelection = (view: EditorView) => {
  const ranges = view.state.selection.ranges;
  return ranges.length === 1 && ranges[0].from === ranges[0].to;
};

export const getSingleCursorPosition = (view: EditorView) => view.state.selection.ranges[0].from;

export const isSelectionRange = (range: SelectionRange) => range.from !== range.to;

export const getSelectionRangeContent = (view: EditorView, range: SelectionRange) =>
  view.state.sliceDoc(range.from, range.to);

export const buildTransaction = (view: EditorView, spec: TransactionSpec) => view.state.update(spec);

export const createReplaceContentTransaction = (documentLength: number, content: string): TransactionSpec => ({
  changes: { from: 0, to: documentLength, insert: content },
  selection: EditorSelection.cursor(content.length),
  scrollIntoView: true,
});

export const createAppendContentTransaction = (from: number, content: string): TransactionSpec => ({
  changes: {
    from: from,
    insert: content,
  },
  selection: EditorSelection.cursor(from + content.length),
  scrollIntoView: true,
});

export const createSelectionRangesSpec = (view: EditorView, key: string) => {
  let selections: string[] = [];
  let results: ScriptResult = {};

  view.state.selection.ranges.forEach((range) => selections.push(getSelectionRangeContent(view, range)));

  try {
    results = execScript(key, selections);
  } catch (e) {
    return {
      notification: {
        type: NotificationStatus.DANGER,
        message: "Oops, something went wrong.",
      },
    };
  }

  const nextRanges = results?.content?.reverse();

  const spec = nextRanges
    ? view.state.changeByRange((selectionRange) => {
        const result = nextRanges.pop();

        const changes = {
          from: selectionRange.from,
          to: isSelectionRange(selectionRange) ? selectionRange.to : undefined,
          insert: result,
        };

        const range = isSelectionRange(selectionRange)
          ? EditorSelection.range(selectionRange.from, selectionRange.from + (result?.length ?? 0))
          : EditorSelection.cursor(selectionRange.from + (result?.length ?? 0));

        return { changes, range };
      })
    : undefined;

  return { spec, notification: results.notification };
};
