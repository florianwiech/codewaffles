import { RefObject, useLayoutEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { initialContent } from "./initialContent";
import { basics } from "./setup/basics";
import { initialThemeSetup } from "./useEditorTheme";
import { panels } from "./panels";

const createEditor = (node: HTMLElement) => {
  const startState = EditorState.create({
    doc: initialContent,
    extensions: [basics, javascript(), initialThemeSetup, panels],
  });

  const view = new EditorView({
    state: startState,
    parent: node,
  });
  view.focus();

  return view;
};

export const useEditor = (ref: RefObject<HTMLElement>) => {
  const editorRef = useRef<EditorView>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    editorRef.current = createEditor(ref.current);

    return () => editorRef.current?.destroy();
  }, [ref]);

  return editorRef;
};
