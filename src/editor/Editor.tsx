import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightSpecialChars,
  keymap,
} from "@codemirror/view";
import { createRef, useEffect, useRef } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { highlightActiveLineGutter, lineNumbers } from "@codemirror/gutter";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets";
import { lintKeymap } from "@codemirror/lint";
import {
  highlightSelectionMatches,
  searchConfig,
  searchKeymap,
} from "@codemirror/search";
import { foldGutter, foldKeymap } from "@codemirror/fold";
import { commentKeymap } from "@codemirror/comment";
import { history, historyKeymap } from "@codemirror/history";
import { indentOnInput } from "@codemirror/language";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { bracketMatching } from "@codemirror/matchbrackets";
import { useLayout } from "../ui";
import { AppearanceState } from "../ui/appearance";
import { StyledEditor } from "./Editor.style";
import { initialContent } from "./initialContent";
import { primerDark, primerLight } from "./primerTheme";

export const Editor = () => {
  const theme = useLayout();
  const ref = createRef<HTMLDivElement>();
  const viewRef = useRef<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    const startState = EditorState.create({
      doc: initialContent,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        defaultHighlightStyle.fallback,
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        searchConfig({ top: true }),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...commentKeymap,
          ...completionKeymap,
          ...lintKeymap,
          indentWithTab,
        ]),
        javascript(),
        theme === AppearanceState.LIGHT ? primerLight : primerDark,
      ],
    });

    viewRef.current = new EditorView({
      state: startState,
      parent: ref.current,
    });

    return () => viewRef.current?.destroy();
  }, [ref, theme]);

  return <StyledEditor ref={ref} />;
};
