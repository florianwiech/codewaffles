import { FC } from "react";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Panel, showPanel } from "@codemirror/panel";
import ReactDOM from "react-dom";
import { EditorState } from "@codemirror/state";

type CursorPosition = {
  lineNumber: number;
  cursorPosition: number;
};
type CaretCount = { caretCount: number };
type Props = CursorPosition | CaretCount | {};

const isCursorPosition = (props: Props): props is CursorPosition =>
  (props as CursorPosition).lineNumber !== undefined;
const isCaretCount = (props: Props): props is CaretCount =>
  (props as CaretCount).caretCount !== undefined;

const CursorPanelView: FC<Props> = (props) => {
  if (isCursorPosition(props)) {
    const { lineNumber, cursorPosition } = props;
    return (
      <>
        {lineNumber}:{cursorPosition}
      </>
    );
  }
  if (isCaretCount(props)) {
    const { caretCount } = props;
    return <>{caretCount} carets</>;
  }

  return null;
};

class CursorPanel {
  dom: HTMLElement;

  constructor(state: EditorState) {
    this.dom = document.createElement("div");
    this.renderElement(state);
  }

  static createPanel(view: EditorView): Panel {
    return new CursorPanel(view.state);
  }

  renderElement(state: EditorState) {
    const props = this.getCursorPosition(state);
    ReactDOM.render(<CursorPanelView {...props} />, this.dom);
  }

  update = (update: ViewUpdate) => {
    if (!update.docChanged) {
      this.renderElement(update.state);
    }
  };

  getCursorPosition(state: EditorState): Props {
    const { length: selectionCount } = state.selection.ranges;
    if (selectionCount === 1) {
      const selection = state.selection.ranges[0];
      const line = state.doc.lineAt(selection.head);

      return {
        lineNumber: line.number,
        cursorPosition: selection.head - line.from,
      };
    } else if (selectionCount > 1) {
      return { caretCount: selectionCount };
    } else {
      return {};
    }
  }
}

export function cursor() {
  return showPanel.of(CursorPanel.createPanel);
}
