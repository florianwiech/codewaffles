import { createElement } from "react";
import { createRoot, Root } from "react-dom/client";
import { Subject } from "rxjs";
import { EditorView, showPanel, ViewUpdate } from "@codemirror/view";
import { Notification, NotificationComponent } from "../../notification/Notification";

type Params = {
  view: EditorView;
  root: Root;
  notification$: Subject<Notification | null>;
};

const renderElement = ({ notification$, root, view }: Params) => {
  root.render(createElement(NotificationComponent, { view, notification$ }));
};

export const notification = (notification$: Subject<Notification | null>) =>
  showPanel.of((view: EditorView) => {
    const dom = document.createElement("div");
    dom.className = "cm-notification";
    const root = createRoot(dom);

    const update = (update: ViewUpdate) => renderElement({ root, view: update.view, notification$ });

    renderElement({ root, view, notification$ });

    return {
      dom,
      update,
    };
  });
