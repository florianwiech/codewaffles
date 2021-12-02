import { useEffect } from "react";
import { EditorSelection } from "@codemirror/state";
import { scriptCollection } from "../scripts";
import { CommandTypes } from "../types";
import { command$ } from "../streams";
import { CodeMirrorEditor } from "./editor.types";

export const useEditorTransforms = (editor: CodeMirrorEditor) => {
  useEffect(() => {
    const subscription = command$.subscribe((command) => {
      if (!editor.current) return;

      switch (command.type) {
        case CommandTypes.SEARCH_CLOSED:
          editor.current.focus();
          break;
        case CommandTypes.PERFORM_TRANSFORM:
          const { handler, append } = scriptCollection[command.key];

          if (handler) {
            const { dispatch, state } = editor.current;
            const { ranges } = state.selection;

            const isSingleCursorWithoutSelection =
              ranges.length === 1 && ranges[0].from === ranges[0].to;

            if (isSingleCursorWithoutSelection) {
              const result = handler(state.doc.toString());

              if (append) {
                const { from } = state.selection.ranges[0];
                dispatch(
                  state.update({
                    changes: {
                      from: from,
                      insert: result,
                    },
                    selection: EditorSelection.cursor(from + result.length),
                  })
                );
              } else {
                dispatch(
                  state.update({
                    changes: { from: 0, to: state.doc.length, insert: result },
                  })
                );
              }
            } else {
              dispatch(
                state.changeByRange((range) => {
                  const result = handler(state.sliceDoc(range.from, range.to));

                  const isCursorPlacement = range.from === range.to;
                  let changes = [];
                  let nextRange;

                  if (isCursorPlacement) {
                    changes.push({ from: range.from, insert: result });
                    nextRange = EditorSelection.cursor(
                      range.from + result.length
                    );
                  } else {
                    changes.push({
                      from: range.from,
                      to: range.to,
                      insert: result,
                    });
                    nextRange = EditorSelection.range(
                      range.from,
                      range.from + result.length
                    );
                  }

                  return { changes, range: nextRange };
                })
              );
            }
          }
          editor.current?.focus();
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, [editor]);
};
