import { BehaviorSubject, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { EditorView } from "@codemirror/view";
import { Command, Notification, isEditorView } from "./domain";

export const command$ = new Subject<Command>();

export const editor$ = new BehaviorSubject<EditorView | null>(null);
export const view$ = editor$.pipe(filter<EditorView | null, EditorView>(isEditorView));

export const notification$ = new Subject<Notification | null>();
