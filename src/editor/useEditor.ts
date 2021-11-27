import { RefObject, useLayoutEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { initialContent } from "./setup/initialContent";
import { basics } from "./setup/basics";
import { initialThemeSetup } from "./useEditorTheme";
import { statusbar } from "./statusbar";
import { initialLanguageSetup } from "./setup/language";

const createEditor = (node: HTMLElement) => {
  const startState = EditorState.create({
    doc: initialContent,
    extensions: [basics, initialThemeSetup, initialLanguageSetup, statusbar],
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
