import { createElement, FC } from "react";
import { createRoot, Root } from "react-dom/client";
import { EditorView, showPanel, ViewUpdate } from "@codemirror/view";

export type StatusbarParams = FC<{ view: EditorView }>;

type Params = {
  view: EditorView;
  root: Root;
  component: StatusbarParams;
};
const renderElement = ({ component, root, view }: Params) => {
  root.render(createElement(component, { view }));
};

export const statusbar = (component: StatusbarParams) =>
  showPanel.of((view: EditorView) => {
    const dom = document.createElement("div");
    dom.className = "cm-statusbar";

    const root = createRoot(dom);

    const update = (update: ViewUpdate) => renderElement({ root, view: update.view, component });

    renderElement({ root, view, component });

    return {
      dom,
      update,
    };
  });
