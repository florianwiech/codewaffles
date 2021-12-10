import { eachValueFrom } from "rxjs-for-await";
import { BehaviorSubject, first } from "rxjs";
import { mocked } from "../../shared/testing/mocked";
import { createEditor } from "../../editor/setup/createEditor";
import { execScript } from "../../scripts";
import { Command, CommandTypes } from "../types";
import { editor$, getEditorChanges } from "../editor";

jest.mock("../../scripts", () => ({
  ...jest.requireActual("../../scripts"),
  scriptCollection: {
    "create-timestamp-seconds": {
      append: true,
      handler: () => "uff",
    },
  },
  execScript: jest.fn(),
}));

describe("editorChanges$", () => {
  const cmd$ = new BehaviorSubject<Command>({} as Command);

  let view = createEditor(document.body, { doc: "" });
  let focusSpy = jest.spyOn(view, "focus");
  let dispatchSpy = jest.spyOn(view, "dispatch");

  // let execScriptSpy = jest.spyOn(Scripts, "execScript");

  beforeEach(() => {
    view = createEditor(document.body, { doc: "" });
    focusSpy = jest.spyOn(view, "focus");
    dispatchSpy = jest.spyOn(view, "dispatch");

    // execScriptSpy = jest
    //   .spyOn(Scripts, "execScript")
    //   .mockReturnValue("welcome");

    mocked(execScript).mockRestore();
    // mocked(execScript).mockReturnValue("content");

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

    // THEN
    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe("");
    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it("should transform content", async () => {
    mocked(execScript).mockReturnValue("content");

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

    // expect(execScriptSpy).toHaveBeenCalled();
    expect(mocked(execScript)).toHaveBeenCalled();

    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  // it("should transform ranges", () => {
  // TODO build up test
  // });
});
