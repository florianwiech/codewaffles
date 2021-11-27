import { RefObject, useLayoutEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { initialContent } from "./initialContent";

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

    editorRef.current = createEditor(ref.current, extensions);

    return () => editorRef.current?.destroy();
  }, [extensions, ref]);

  return editorRef;
};
