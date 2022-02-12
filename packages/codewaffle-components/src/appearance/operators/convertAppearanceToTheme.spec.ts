import { TestScheduler } from "rxjs/testing";
import { AppearanceState } from "../appearance-types";
import { mockMatchMediaScoped } from "../../shared/testing/mockMatchMedia";
import { convertAppearanceToTheme } from "./convertAppearanceToTheme";

describe("convertAppearanceToTheme", () => {
  let testScheduler: TestScheduler = new TestScheduler(() => {});
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
  });

  it("should set light & dark theme", () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable, expectSubscriptions } = helpers;

      // GIVEN
      const l = AppearanceState.LIGHT;
      const d = AppearanceState.DARK;

      const source = hot("-l-d-|", { l, d });
      const subs = "^----!";
      const expected = cold("-l-d-|", { l, d });

      // WHEN
      const result = source.pipe(convertAppearanceToTheme());

      // THEN
      expectObservable(result).toEqual(expected);
      expectSubscriptions(source.subscriptions).toBe(subs);
    });
  });

  it("should match dark theme", () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable, expectSubscriptions } = helpers;

      mockMatchMediaScoped({ matches: true });

      // GIVEN
      const s = AppearanceState.SYSTEM;
      const d = AppearanceState.DARK;

      const source = hot("-s-|", { s });
      const subs = "^--!";
      const expected = cold("-d-|", { d });

      // WHEN
      const result = source.pipe(convertAppearanceToTheme());

      // THEN
      expectObservable(result).toEqual(expected);
      expectSubscriptions(source.subscriptions).toBe(subs);
    });
  });

  it("should match light theme", () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable, expectSubscriptions } = helpers;

      mockMatchMediaScoped({ matches: false });

      // GIVEN
      const s = AppearanceState.SYSTEM;
      const l = AppearanceState.LIGHT;

      const source = hot("-s-|", { s });
      const subs = "^--!";
      const expected = cold("-l-|", { l });

      // WHEN
      const result = source.pipe(convertAppearanceToTheme());

      // THEN
      expectObservable(result).toEqual(expected);
      expectSubscriptions(source.subscriptions).toBe(subs);
    });
  });
});
