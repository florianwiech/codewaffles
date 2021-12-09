import { createEditor } from "../../editor/setup/createEditor";
import { editor$, editorChanges$ } from "../editor";
import { command$ } from "../command";
import { CommandTypes } from "../types";
import { TestScheduler } from "rxjs/testing";
import { tap } from "rxjs/operators";

describe("close search command", () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected),
    );
  });

  it("works", () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable, expectSubscriptions } = helpers;
      // GIVEN
      const view = createEditor(document.body);
      const viewSpy = jest.spyOn(view, "focus");
      editor$.next(view);

      const command = { type: CommandTypes.SEARCH_CLOSED };

      // WHEN

      const src = hot("    --c", { c: command });
      const expectedSrc = "--c";

      const epicObs = editorChanges$; // Subscribe to the subject, before the value is emitted
      const expectedEpic = "--v";
      const epicValues = { command, view };

      expectObservable(src.pipe(tap((c) => command$.next(c)))).toBe(
        expectedSrc,
        { c: command },
      );
      expectObservable(epicObs).toBe(expectedEpic, { v: epicValues });

      // todo find an async way for testing
      // maybe somehow possible with default testscheduler? 🤔
      // maybe the idea of the following post works:
      // https://stackoverflow.com/questions/61465243/testscheduler-for-subject
      // ansonsten nochmal zum video zurück, da hatte ich doch schon einige ideen!
      // https://www.youtube.com/watch?v=s9FY-MBW1rc

      // THEN
      // expect(viewSpy).toHaveBeenCalled();
      // expect(view.hasFocus).toBeTruthy();

      // CLEANUP
      view.destroy();
    });
  });
});
