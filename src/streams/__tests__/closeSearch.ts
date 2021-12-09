import { TestScheduler } from "rxjs/testing";
import { tap } from "rxjs/operators";
import { createEditor } from "../../editor/setup/createEditor";
import { editor$, editorChanges$ } from "../editor";
import { command$ } from "../command";
import { CommandTypes } from "../types";

// https://stackoverflow.com/questions/61465243/testscheduler-for-subject
// https://www.youtube.com/watch?v=s9FY-MBW1rc
describe("close search command", () => {
  // let testScheduler: TestScheduler;
  //
  // beforeEach(() => {
  //   testScheduler = new TestScheduler((actual, expected) =>
  //     expect(actual).toEqual(expected),
  //   );
  // });
  //
  // it("should exec close search", () => {
  //   testScheduler.run((helpers) => {
  //     const { hot, expectObservable } = helpers;
  //
  //     const view = createEditor(document.body);
  //     editor$.next(view);
  //
  //     const command = { type: CommandTypes.SEARCH_CLOSED };
  //
  //     const observable = hot("-c", { c: command }).pipe(
  //       tap((c) => command$.next(c)),
  //     );
  //     const obsMarble = "       -c";
  //     const obsValue = { c: command };
  //
  //     const expectedMarble = "-r";
  //     const expectedValue = { r: { command, view } };
  //
  //     expectObservable(observable).toBe(obsMarble, obsValue);
  //     expectObservable(editorChanges$).toBe(expectedMarble, expectedValue);
  //
  //     // CLEANUP
  //     view.destroy();
  //   });
  // });

  it("should focus editor", () => {
    // GIVEN
    const view = createEditor(document.body);
    const focusSpy = jest.spyOn(view, "focus");
    const dispatchSpy = jest.spyOn(view, "dispatch");

    const closeSearchCommand = { type: CommandTypes.SEARCH_CLOSED };

    // WHEN
    editor$.next(view);

    const sub = editorChanges$.subscribe();

    command$.next(closeSearchCommand);

    // THEN
    expect(view.hasFocus).toBeTruthy();
    expect(focusSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();

    // CLEANUP
    sub.unsubscribe();
    view.destroy();
  });
});
