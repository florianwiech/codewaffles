import { BehaviorSubject, Subject } from "rxjs";
import { EditorView } from "@codemirror/view";
import { filter } from "rxjs/operators";
import { Command, isEditorView } from "./types";

export const command$ = new Subject<Command>();

export const editor$ = new BehaviorSubject<EditorView | null>(null);
export const view$ = editor$.pipe(filter(isEditorView));
