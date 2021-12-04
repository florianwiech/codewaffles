import { EditorView } from "@codemirror/view";
import { EditorState, EditorStateConfig } from "@codemirror/state";

export const createEditor = (
  node: HTMLElement,
  options: EditorStateConfig = {},
) => {
  const state = EditorState.create(options);

  const view = new EditorView({ state, parent: node });
  view.focus();

  return view;
};
