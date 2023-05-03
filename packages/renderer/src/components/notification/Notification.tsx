import React, { FC, useEffect, useRef } from "react";
// import { ReactComponent as CloseIcon } from "bootstrap-icons/icons/x-circle-fill.svg";
import { EditorView } from "@codemirror/view";
import { Subject } from "rxjs";
import { AnimatePresence, motion } from "framer-motion";
import { useObservable } from "../../shared/hooks/useObservable";

export enum NotificationStatus {
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}

export type Notification = {
  type: NotificationStatus;
  message: string;
};

export const NotificationComponent: FC<{ view: EditorView; notification$: Subject<Notification | null> }> = ({
  notification$,
}) => {
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
  }, [notification$, state]);

  return (
    <AnimatePresence mode="wait">
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
            Close
            {/*<CloseIcon />*/}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
