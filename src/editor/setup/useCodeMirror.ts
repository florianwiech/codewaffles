import { RefObject, useLayoutEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { initialContent } from "./initialContent";
import { view$ } from "./view-subject";

const createEditor = (node: HTMLElement, extensions: Extension[] = []) => {
  const startState = EditorState.create({
    doc: initialContent,
    extensions: extensions,
  });

  const view = new EditorView({
    state: startState,
    parent: node,
  });
  view.focus();

  return view;
};

export const useCodeMirror = (
  ref: RefObject<HTMLElement>,
  extensions?: Extension[]
) => {
  const editorRef = useRef<EditorView>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const view = createEditor(ref.current, extensions);

    editorRef.current = view;
    view$.next(view);

    return () => view.destroy();
  }, [extensions, ref]);

  return editorRef;
};
