import { createEditor } from "../../editor/setup/createEditor";
import * as Scripts from "../../scripts";
import { CommandTypes } from "../types";
import { editor$, editorChanges$ } from "../editor";
import { command$ } from "../command";
import { first, of, tap } from "rxjs";
import { subscribeSpyTo } from "@hirez_io/observer-spy";
// import { scriptCollection } from "../../scripts";
// import { mocked } from "../../shared/testing/mocked";
//
// jest.mock("../../scripts", () => ({
//   ...jest.requireActual("../../scripts"),
//   scriptCollection: jest.fn(),
// }));

describe("editorChanges$", () => {
  beforeEach(() => {
    // mocked(scriptCollection).mockRestore();
    // mocked(scriptCollection).mockReturnValue({});
  });

  // it("should focus editor when search closed", () => {
  //   // GIVEN
  //   const view = createEditor(document.body, { doc: "" });
  //   const focusSpy = jest.spyOn(view, "focus");
  //   const dispatchSpy = jest.spyOn(view, "dispatch");
  //
  //   const command = { type: CommandTypes.SEARCH_CLOSED };
  //
  //   // WHEN
  //   editor$.next(view);
  //
  //   const sub = editorChanges$.subscribe();
  //
  //   command$.next(command);
  //
  //   // THEN
  //   expect(view.hasFocus).toBeTruthy();
  //   expect(view.state.doc.toString()).toBe("");
  //   expect(focusSpy).toHaveBeenCalled();
  //   expect(dispatchSpy).not.toHaveBeenCalled();
  //
  //   // CLEANUP
  //   sub.unsubscribe();
  //   view.destroy();
  // });

  let view = createEditor(document.body, { doc: "" });
  let focusSpy = jest.spyOn(view, "focus");
  let dispatchSpy = jest.spyOn(view, "dispatch");

  let execScriptSpy = jest.spyOn(Scripts, "execScript");

  beforeEach(() => {
    view = createEditor(document.body, { doc: "" });
    focusSpy = jest.spyOn(view, "focus");
    dispatchSpy = jest.spyOn(view, "dispatch");

    execScriptSpy = jest.spyOn(Scripts, "execScript");

    editor$.next(view);
  });

  afterEach(() => {
    editor$.next(null);
    view.destroy();
  });

  it("should transform content", async () => {
    const command = {
      type: CommandTypes.PERFORM_TRANSFORM,
      key: "create-timestamp-seconds",
    };

    const observerSpy = subscribeSpyTo(editorChanges$);

    command$.next(command);
    command$.complete();

    await observerSpy.onComplete();

    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe("some content");

    expect(execScriptSpy).toHaveBeenCalled();

    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();

    observerSpy.unsubscribe();
  });
  // it("should transform ranges", () => {});
});
