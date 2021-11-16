import { Text } from "@codemirror/text";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Panel, showPanel } from "@codemirror/panel";
import ReactDOM from "react-dom";
import { FC } from "react";

const CharCounterPanel: FC<{ count: number }> = ({ count }) => {
  return <>{count} chars</>;
};

class CharCounter {
  dom: HTMLElement;

  constructor(doc: Text) {
    this.dom = document.createElement("div");
    this.renderElement(doc);
  }

  static createPanel(view: EditorView): Panel {
    return new CharCounter(view.state.doc);
  }

  renderElement(doc: Text) {
    const count = this.countChars(doc);
    ReactDOM.render(<CharCounterPanel count={count} />, this.dom);
  }

  update = (update: ViewUpdate) => {
    if (update.docChanged) {
      this.renderElement(update.state.doc);
    }
  };

  countChars(doc: Text) {
    return doc.length;
  }
}

export function charCounter() {
  return showPanel.of(CharCounter.createPanel);
}
