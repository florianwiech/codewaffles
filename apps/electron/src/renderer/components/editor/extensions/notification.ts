import { createElement } from "react";
import ReactDOM from "react-dom";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { showPanel } from "@codemirror/panel";
import { Subject } from "rxjs";
import { NotificationComponent, Notification } from "@codewaffle/components";

type Params = {
  view: EditorView;
  dom: HTMLElement;
  notification$: Subject<Notification | null>;
};

const renderElement = ({ notification$, dom, view }: Params) => {
  ReactDOM.render(createElement(NotificationComponent, { view, notification$ }), dom);
};

export const notification = (notification$: Subject<Notification | null>) =>
  showPanel.of((view: EditorView) => {
    const dom = document.createElement("div");
    dom.className = "cm-notification";

    const update = (update: ViewUpdate) => renderElement({ dom, view: update.view, notification$ });

    renderElement({ dom, view, notification$ });

    return {
      dom,
      update,
    };
  });
