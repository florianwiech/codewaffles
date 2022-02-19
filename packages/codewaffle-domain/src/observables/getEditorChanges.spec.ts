import { BehaviorSubject, first, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { eachValueFrom } from "rxjs-for-await";
import { EditorState, EditorSelection, EditorStateConfig } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import * as Scripts from "@codewaffle/transformers";
import { Command, CommandTypes, isEditorView, Notification } from "../types";
import { getEditorChanges } from "./getEditorChanges";

const command$ = new BehaviorSubject<Command>({} as Command);
export const editor$ = new BehaviorSubject<EditorView | null>(null);
export const view$ = editor$.pipe(filter(isEditorView));

export const notification$ = new Subject<Notification | null>();

export const createEditor = (node: HTMLElement, options: EditorStateConfig = {}) => {
  const state = EditorState.create(options);

  return new EditorView({ state, parent: node });
};

describe("getEditorChanges", () => {
  const initialContent = `Hello World.`;

  let view = createEditor(document.body, { doc: initialContent });
  let focusSpy = jest.spyOn(view, "focus");
  let dispatchSpy = jest.spyOn(view, "dispatch");

  let execScriptSpy = jest.spyOn(Scripts, "execScript");
  let isAppendableScriptSpy = jest.spyOn(Scripts, "isAppendableScript");

  beforeEach(() => {
    view = createEditor(document.body, { doc: initialContent });
    focusSpy = jest.spyOn(view, "focus");
    dispatchSpy = jest.spyOn(view, "dispatch");

    execScriptSpy.mockRestore();
    execScriptSpy = jest.spyOn(Scripts, "execScript");
    execScriptSpy.mockReturnValue({ content: ["content"] });

    isAppendableScriptSpy.mockRestore();
    isAppendableScriptSpy = jest.spyOn(Scripts, "isAppendableScript");

    editor$.next(view);
  });

  afterEach(() => {
    editor$.next(null);
    command$.next({} as Command);
    view.destroy();
  });

  it("should focus editor when search closed", async () => {
    const command = { type: CommandTypes.SEARCH_CLOSED };
    command$.next(command);

    const source$ = getEditorChanges({ command$, view$, notification$ }).pipe(first());

    const result = [];
    for await (const value of eachValueFrom(source$)) {
      result.push(value);
    }

    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe(initialContent);
    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(execScriptSpy).not.toHaveBeenCalled();
  });

  it("should replace content", async () => {
    isAppendableScriptSpy.mockReturnValue(false);

    const command = {
      type: CommandTypes.PERFORM_TRANSFORM,
      key: "create-timestamp-seconds",
    };

    command$.next(command);

    const source$ = getEditorChanges({ command$, view$, notification$ }).pipe(first());

    const result = [];
    for await (const value of eachValueFrom(source$)) {
      result.push(value);
    }

    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe("content");

    expect(execScriptSpy).toHaveBeenCalled();
    expect(isAppendableScriptSpy).toHaveBeenCalled();

    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should append content", async () => {
    isAppendableScriptSpy.mockReturnValue(true);

    view.dispatch(
      view.state.update({
        selection: EditorSelection.cursor(initialContent.length),
      }),
    );

    const command = {
      type: CommandTypes.PERFORM_TRANSFORM,
      key: "create-timestamp-seconds",
    };

    command$.next(command);

    const source$ = getEditorChanges({ command$, view$, notification$ }).pipe(first());

    const result = [];
    for await (const value of eachValueFrom(source$)) {
      result.push(value);
    }

    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe(`${initialContent}content`);

    expect(execScriptSpy).toHaveBeenCalled();
    expect(isAppendableScriptSpy).toHaveBeenCalled();

    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("should transform ranges", async () => {
    isAppendableScriptSpy.mockReturnValue(true);

    view.dispatch(
      view.state.update({
        selection: EditorSelection.range(0, 11),
      }),
    );

    const command = {
      type: CommandTypes.PERFORM_TRANSFORM,
      key: "create-timestamp-seconds",
    };

    command$.next(command);

    const source$ = getEditorChanges({ command$, view$, notification$ }).pipe(first());

    const result = [];
    for await (const value of eachValueFrom(source$)) {
      result.push(value);
    }

    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe("content.");

    expect(execScriptSpy).toHaveBeenCalled();
    expect(isAppendableScriptSpy).not.toHaveBeenCalled();

    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
