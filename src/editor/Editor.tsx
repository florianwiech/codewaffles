import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { useEffect, useRef } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { StyledEditor } from "./Editor.style";
import { initialContent } from "./initialContent";
import { basics } from "./setup/basics";
import { panels } from "./panels";
import { initialThemeSetup, useEditorTheme } from "./useEditorTheme";

export const Editor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    const startState = EditorState.create({
      doc: initialContent,
      extensions: [basics, javascript(), initialThemeSetup, panels],
    });

    viewRef.current = new EditorView({
      state: startState,
      parent: ref.current,
    });
    viewRef.current?.focus();
    return () => viewRef.current?.destroy();
  }, []);

  useEditorTheme(viewRef);

  return <StyledEditor ref={ref} />;
};
