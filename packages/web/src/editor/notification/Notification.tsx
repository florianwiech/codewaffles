import { ReactComponent as CloseIcon } from "bootstrap-icons/icons/x-circle-fill.svg";
import { FC, useEffect, useRef } from "react";
import { EditorView, ViewUpdate } from "@codemirror/view";
import ReactDOM from "react-dom";
import { showPanel } from "@codemirror/panel";
import { AnimatePresence, motion } from "framer-motion";
import { useObservable } from "../../shared/hooks/useObservable";
import { notification$ } from "../../store";

export const Notification: FC<{ view: EditorView }> = () => {
  const timeoutRef = useRef<any>();
  const state = useObservable(notification$);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!state) {
      timeoutRef.current = undefined;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      notification$.next(null);
    }, 8000);
  }, [state]);

  return (
    <AnimatePresence exitBeforeEnter>
      {state ? (
        <motion.div
          key={state.message}
          className={state.type}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
        >
          <span>{state.message}</span>
          <button onClick={() => notification$.next(null)}>
            <CloseIcon />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const renderElement = (dom: HTMLElement, view: EditorView) => {
  ReactDOM.render(<Notification view={view} />, dom);
};

export const notification = showPanel.of((view: EditorView) => {
  const element = document.createElement("div");
  element.className = "cm-notification";

  const update = (update: ViewUpdate) => renderElement(element, update.view);

  renderElement(element, view);

  return {
    dom: element,
    update,
  };
});
