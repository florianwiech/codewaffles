import { cleanup, renderHook } from "@testing-library/react-hooks";
import { EditorView } from "@codemirror/view";
import { editor$ } from "../streams";
import { useCodeMirror } from "./useCodeMirror";
import * as CreateEditor from "./setup/createEditor";

describe("useCodeMirror", () => {
  it("should publish view on editor subject", () => {
    const element = document.createElement("div");

    const { result } = renderHook(() => useCodeMirror({ current: element }));
    const view = result.current.current;

    expect(editor$.getValue()).toBe(view);

    cleanup();

    expect(editor$.getValue()).toBeNull();
  });

  it("should focus editor", () => {
    const view = new EditorView();
    const focusSpy = jest.spyOn(view, "focus");
    const createEditorSpy = jest
      .spyOn(CreateEditor, "createEditor")
      .mockReturnValue(view);

    const element = document.createElement("div");

    renderHook(() => useCodeMirror({ current: element }));

    expect(createEditorSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });
});
