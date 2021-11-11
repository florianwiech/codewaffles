import { basicSetup, EditorView } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { createRef, useEffect, useRef } from "react";

export const Editor = () => {
  const ref = createRef<HTMLDivElement>();
  const viewRef = useRef<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    const startState = EditorState.create({
      extensions: [basicSetup, keymap.of([indentWithTab])],
    });

    viewRef.current = new EditorView({
      state: startState,
      parent: document.body,
    });

    return () => viewRef.current?.destroy();
  }, [ref]);

  return <div ref={ref} />;
};
