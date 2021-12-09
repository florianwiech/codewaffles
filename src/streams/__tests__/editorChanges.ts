import { createEditor } from "../../editor/setup/createEditor";
import * as Scripts from "../../scripts";
import { Command, CommandTypes } from "../types";
import { editor$, editorChanges$, getEditorChanges } from "../editor";
import { command$ } from "../command";
import { eachValueFrom, latestValueFrom } from "rxjs-for-await";
import {
  BehaviorSubject,
  first,
  mapTo,
  merge,
  of,
  OperatorFunction,
  skipWhile,
  takeUntil,
  takeWhile,
  timer,
} from "rxjs";
import { map, tap } from "rxjs/operators";
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

  // let execScriptSpy = jest.spyOn(Scripts, "execScript");

  beforeEach(() => {
    view = createEditor(document.body, { doc: "" });
    focusSpy = jest.spyOn(view, "focus");
    dispatchSpy = jest.spyOn(view, "dispatch");

    // execScriptSpy = jest.spyOn(Scripts, "execScript");

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

    const cmd$ = new BehaviorSubject<Command>(command);

    const source$ = getEditorChanges(cmd$).pipe(first());

    const result = [];
    for await (const value of eachValueFrom(source$)) {
      result.push(value);
      console.log("value", value);
    }

    console.log("result", result);
    console.log("doc", view.state.doc.toString());
    console.log("view", view);

    expect(view.hasFocus).toBeTruthy();
    expect(view.state.doc.toString()).toBe("some content");

    // expect(execScriptSpy).toHaveBeenCalled();

    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });
  // it("should transform ranges", () => {});

  test("rxjs-for-await", async () => {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

    const toAlphabet = (): OperatorFunction<any, string> => (source) =>
      source.pipe(map((v) => ALPHABET[v]));

    const source = timer(100, 10).pipe(toAlphabet(), takeWhile(Boolean));

    const result = [];
    for await (const value of latestValueFrom(source)) {
      result.push(value);
    }

    expect(result).toStrictEqual(ALPHABET.split(""));
  });
});
