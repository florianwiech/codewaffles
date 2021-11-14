import { Text } from "@codemirror/text";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Panel, showPanel } from "@codemirror/panel";
import ReactDOM from "react-dom";
import { FC } from "react";

const WordCounterPanel: FC<{ count: number }> = ({ count }) => {
  return <>{count} words</>;
};

class WordCounter {
  dom: HTMLElement;

  constructor(doc: Text) {
    this.dom = document.createElement("div");
    this.renderElement(doc);
  }

  static createPanel(view: EditorView): Panel {
    return new WordCounter(view.state.doc);
  }

  renderElement(doc: Text) {
    const count = this.countWords(doc);
    ReactDOM.render(<WordCounterPanel count={count} />, this.dom);
  }

  update = (update: ViewUpdate) => {
    if (update.docChanged) {
      this.renderElement(update.state.doc);
    }
  };

  countWords(doc: Text) {
    let count = 0,
      iter = doc.iter();
    while (!iter.next().done) {
      let inWord = false;
      for (let i = 0; i < iter.value.length; i++) {
        let word = /\w/.test(iter.value[i]);
        if (word && !inWord) count++;
        inWord = word;
      }
    }
    return count;
  }
}

export function wordCounter() {
  return showPanel.of(WordCounter.createPanel);
}
