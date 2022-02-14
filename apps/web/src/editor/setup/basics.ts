import { highlightActiveLineGutter, lineNumbers } from "@codemirror/gutter";
import { drawSelection, highlightActiveLine, highlightSpecialChars, keymap } from "@codemirror/view";
import { history, historyKeymap } from "@codemirror/history";
import { foldGutter, foldKeymap } from "@codemirror/fold";
import { EditorState } from "@codemirror/state";
import { indentOnInput } from "@codemirror/language";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { bracketMatching } from "@codemirror/matchbrackets";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { highlightSelectionMatches, searchConfig, searchKeymap } from "@codemirror/search";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { commentKeymap } from "@codemirror/comment";
import { lintKeymap } from "@codemirror/lint";
import { indentationGuides } from "../extensions/indentation-guides";

export const basics = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  EditorState.tabSize.of(4),
  defaultHighlightStyle.fallback,
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  searchConfig({ top: true }),
  indentationGuides(),
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
];
