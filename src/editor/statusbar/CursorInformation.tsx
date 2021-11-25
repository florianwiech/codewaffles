import { FC } from "react";
import { EditorState } from "@codemirror/state";

function getCursorPosition(state: EditorState) {
  const { length: selectionCount } = state.selection.ranges;
  if (selectionCount !== 1) return;

  const range = state.selection.ranges[0];
  const line = state.doc.lineAt(range.head);

  let selection;
  if (range.from !== range.to) {
    const slice = state.sliceDoc(range.from, range.to);
    const lineBreaks = slice.split(/\r\n|\r|\n/).length - 1;

    selection = {
      chars: slice.length,
      lineBreaks,
    };
  }

  return {
    lineNumber: line.number,
    cursorPosition: range.head - line.from,
    selection,
  };
}

function getCursorCount(state: EditorState) {
  const { length: selectionCount } = state.selection.ranges;
  return selectionCount > 1 ? selectionCount : undefined;
}

export const CursorInformation: FC<{ state: EditorState }> = ({ state }) => {
  const cursor = getCursorPosition(state);
  const caretCount = getCursorCount(state);

  const cursorPosition = `${cursor?.lineNumber}:${cursor?.cursorPosition}`;
  const selectionLineBreaks = `${cursor?.selection?.lineBreaks} line breaks`;
  const singleSelection = `(${cursor?.selection?.chars} chars${
    cursor?.selection?.lineBreaks ? `, ${selectionLineBreaks}` : ""
  })`;

  const multiCursor = `${caretCount} carets`;

  return (
    <div>
      {cursor
        ? cursor.selection
          ? `${cursorPosition} ${singleSelection}`
          : cursorPosition
        : null}
      {caretCount ? multiCursor : null}
    </div>
  );
};
