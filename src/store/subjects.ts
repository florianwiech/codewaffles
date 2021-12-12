import { BehaviorSubject, Subject } from "rxjs";
import { EditorView } from "@codemirror/view";
import { filter } from "rxjs/operators";
import { Command, isEditorView, Notification } from "./types";

export const command$ = new Subject<Command>();

export const editor$ = new BehaviorSubject<EditorView | null>(null);
export const view$ = editor$.pipe(filter(isEditorView));

export const notification$ = new Subject<Notification | null>();
