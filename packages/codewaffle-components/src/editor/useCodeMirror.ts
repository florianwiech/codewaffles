import { RefObject, useLayoutEffect, useRef } from "react";
import { Subject } from "rxjs";
import { EditorView } from "@codemirror/view";
import { EditorStateConfig } from "@codemirror/state";
import { createEditor } from "./setup/createEditor";

export type useCodeMirrorParams = {
  editor$: Subject<EditorView | null>;
  ref: RefObject<HTMLElement>;
  options?: EditorStateConfig;
};

export const useCodeMirror = ({ ref, options, editor$ }: useCodeMirrorParams) => {
  const editorRef = useRef<EditorView>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const view = createEditor(ref.current, options);

    editorRef.current = view;
    editor$.next(view);

    view.focus();

    return () => {
      editor$.next(null);
      view.destroy();
    };
  }, [ref, options, editor$]);

  return editorRef;
};
