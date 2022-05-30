import { cleanup, renderHook } from "@testing-library/react";
import { BehaviorSubject } from "rxjs";
import { EditorView } from "@codemirror/view";
import { useCodeMirror } from "./useCodeMirror";
import * as CreateEditor from "./setup/createEditor";

describe("useCodeMirror", () => {
  it("should publish view on editor subject", () => {
    const element = document.createElement("div");
    const editor$ = new BehaviorSubject<EditorView | null>(null);

    const { result } = renderHook(() => useCodeMirror({ ref: { current: element }, editor$ }));
    const view = result.current.current;

    expect(editor$.getValue()).toBe(view);

    cleanup();

    expect(editor$.getValue()).toBeNull();
  });

  it("should focus editor", () => {
    const view = new EditorView();
    const focusSpy = jest.spyOn(view, "focus");
    const createEditorSpy = jest.spyOn(CreateEditor, "createEditor").mockReturnValue(view);

    const element = document.createElement("div");
    const editor$ = new BehaviorSubject<EditorView | null>(null);

    renderHook(() => useCodeMirror({ ref: { current: element }, editor$ }));

    expect(createEditorSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });
});
