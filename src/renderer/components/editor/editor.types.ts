import { MutableRefObject } from "react";
import { EditorView } from "@codemirror/view";

export type CodeMirrorEditor = MutableRefObject<EditorView | undefined>;
