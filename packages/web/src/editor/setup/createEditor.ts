import { EditorView } from "@codemirror/view";
import { EditorState, EditorStateConfig } from "@codemirror/state";

export const createEditor = (
  node: HTMLElement,
  options: EditorStateConfig = {},
) => {
  const state = EditorState.create(options);

  return new EditorView({ state, parent: node });
};
