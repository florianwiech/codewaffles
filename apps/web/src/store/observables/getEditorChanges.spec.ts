import { BehaviorSubject, first } from "rxjs";
import { eachValueFrom } from "rxjs-for-await";
import { EditorSelection } from "@codemirror/state";
import * as Scripts from "@codewaffle/transformers";
import { createEditor } from "../../editor/setup/createEditor";
import { Command, CommandTypes } from "../types";
import { editor$ } from "../subjects";
import { getEditorChanges } from "./getEditorChanges";

describe("getEditorChanges", () => {
  const cmd$ = new BehaviorSubject<Command>({} as Command);

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
    cmd$.next({} as Command);
    view.destroy();
  });

  it("should focus editor when search closed", async () => {
    const command = { type: CommandTypes.SEARCH_CLOSED };
    cmd$.next(command);

    const source$ = getEditorChanges(cmd$).pipe(first());

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

    cmd$.next(command);

    const source$ = getEditorChanges(cmd$).pipe(first());

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

    cmd$.next(command);

    const source$ = getEditorChanges(cmd$).pipe(first());

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

    cmd$.next(command);

    const source$ = getEditorChanges(cmd$).pipe(first());

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
