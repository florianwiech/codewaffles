import { EditorView } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { initialContent } from "./initialContent";

export const createEditor = (
  node: HTMLElement,
  extensions: Extension[] = [],
) => {
  const state = EditorState.create({
    doc: initialContent,
    extensions: extensions,
  });

  const view = new EditorView({
    state,
    parent: node,
  });
  view.focus();

  return view;
};
