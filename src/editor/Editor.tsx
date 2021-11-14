import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { useEffect, useRef } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { StyledEditor } from "./Editor.style";
import { initialContent } from "./initialContent";
import { primerDark } from "./primerTheme";
import { basics } from "./setup/basics";

export const Editor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    const startState = EditorState.create({
      doc: initialContent,
      extensions: [basics, javascript(), primerDark],
    });

    viewRef.current = new EditorView({
      state: startState,
      parent: ref.current,
    });
    return () => viewRef.current?.destroy();
  }, []);

  return <StyledEditor ref={ref} />;
};
