import { EditorView } from "@codemirror/view";
import {
  EditorSelection,
  SelectionRange,
  TransactionSpec,
} from "@codemirror/state";
import { execScript } from "../scripts";

export const getEditorDocument = (view: EditorView) =>
  view.state.doc.toString();

export const getEditorDocumentLength = (view: EditorView) =>
  view.state.doc.length;

export const isSingleCursorWithoutSelection = (view: EditorView) => {
  const ranges = view.state.selection.ranges;
  return ranges.length === 1 && ranges[0].from === ranges[0].to;
};

export const getSingleCursorPosition = (view: EditorView) =>
  view.state.selection.ranges[0].from;

export const isSelectionRange = (range: SelectionRange) =>
  range.from !== range.to;

export const getSelectionRange = (view: EditorView, range: SelectionRange) =>
  view.state.sliceDoc(range.from, range.to);

export const buildTransaction = (view: EditorView, spec: TransactionSpec) =>
  view.state.update(spec);

export const createReplaceContentTransaction = (
  documentLength: number,
  content: string,
): TransactionSpec => ({
  changes: { from: 0, to: documentLength, insert: content },
  selection: EditorSelection.cursor(content.length),
});

export const createAppendContentTransaction = (
  from: number,
  content: string,
): TransactionSpec => ({
  changes: {
    from: from,
    insert: content,
  },
  selection: EditorSelection.cursor(from + content.length),
});

export const createSelectionRangesSpec = (view: EditorView, key: string) => {
  let script: string[] = [];

  const spec = view.state.changeByRange((range) => {
    const result = execScript(key, getSelectionRange(view, range));

    script.push(result);

    return {
      changes: {
        from: range.from,
        to: isSelectionRange(range) ? range.to : undefined,
        insert: result,
      },
      range: isSelectionRange(range)
        ? EditorSelection.range(range.from, range.from + result.length)
        : EditorSelection.cursor(range.from + result.length),
    };
  });

  return { spec, script };
};
