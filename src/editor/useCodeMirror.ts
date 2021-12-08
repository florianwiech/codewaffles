import { RefObject, useLayoutEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorStateConfig } from "@codemirror/state";
import { editor$ } from "../streams";
import { createEditor } from "./setup/createEditor";

export const useCodeMirror = (
  ref: RefObject<HTMLElement>,
  options?: EditorStateConfig,
) => {
  const editorRef = useRef<EditorView>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const view = createEditor(ref.current, options);

    editorRef.current = view;
    editor$.next(view);

    view.focus();

    return () => view.destroy();
  }, [ref, options]);

  return editorRef;
};
