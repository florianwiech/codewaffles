import { showPanel } from "@codemirror/panel";
import { EditorView, ViewUpdate } from "@codemirror/view";
import ReactDOM from "react-dom";
import { FC } from "react";
import { WordCounter } from "./WordCounter";
import { CharCounter } from "./CharCounter";
import { CursorInformation } from "./CursorInformation";
import { Spacer, StyledStatusbar } from "./Statusbar.style";
import { LanguageSwitch } from "./LanguageSwitch";

const StatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
  return (
    <StyledStatusbar>
      <Spacer />
      <CursorInformation state={view.state} />
      <WordCounter doc={view.state.doc} />
      <CharCounter doc={view.state.doc} />
      <LanguageSwitch view={view} />
    </StyledStatusbar>
  );
};

const renderElement = (dom: HTMLElement, view: EditorView) => {
  ReactDOM.render(<StatusbarPanel view={view} />, dom);
};

export const statusbar = showPanel.of((view: EditorView) => {
  const element = document.createElement("div");
  element.className = "cm-statusbar";

  const update = (update: ViewUpdate) => renderElement(element, update.view);

  renderElement(element, view);

  return {
    dom: element,
    update,
  };
});
