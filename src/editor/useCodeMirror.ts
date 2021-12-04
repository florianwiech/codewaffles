import { RefObject, useLayoutEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { editor$ } from "../streams";
import { createEditor } from "./setup/createEditor";

export const useCodeMirror = (
  ref: RefObject<HTMLElement>,
  extensions?: Extension[],
) => {
  const editorRef = useRef<EditorView>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const view = createEditor(ref.current, extensions);

    editorRef.current = view;
    editor$.next(view);

    return () => view.destroy();
  }, [extensions, ref]);

  return editorRef;
};
