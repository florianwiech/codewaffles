import ReactDOM from "react-dom";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { showPanel } from "@codemirror/panel";
import { createElement, FC } from "react";

export type StatusbarParams = FC<{ view: EditorView }>;

type Params = {
  view: EditorView;
  dom: HTMLElement;
  component: StatusbarParams;
};
const renderElement = ({ component, dom, view }: Params) => {
  ReactDOM.render(createElement(component, { view }), dom);
};

export const statusbar = (component: StatusbarParams) =>
  showPanel.of((view: EditorView) => {
    const dom = document.createElement("div");
    dom.className = "cm-statusbar";

    const update = (update: ViewUpdate) => renderElement({ dom, view: update.view, component });

    renderElement({ dom, view, component });

    return {
      dom,
      update,
    };
  });
