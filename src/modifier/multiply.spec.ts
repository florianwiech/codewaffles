import { marbles } from "rxjs-marbles/jest";
import { TestScheduler } from "rxjs/testing";
import { multiply } from "./multiply";

describe("multiply", () => {
  it(
    "should multiply by 10",
    marbles((m) => {
      const input = m.hot("-a-b-c-d-e-|", { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = "^----------!";
      const expected = m.cold("-a-b-c-d-e-|", {
        a: 20,
        b: 30,
        c: 40,
        d: 50,
        e: 60,
      });
      m.expect(input.pipe(multiply(10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    })
  );
});

describe("multiply with TestScheduler", () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );
  });

  it("multiply", () => {
    testScheduler.run((helpers) => {
      const { cold, hot, expectObservable, expectSubscriptions } = helpers;

      const input = hot("-a-b-c-d-e-|", { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = "^----------!";
      const expected = cold("-a-b-c-d-e-|", {
        a: 20,
        b: 30,
        c: 40,
        d: 50,
        e: 60,
      });

      expectObservable(input.pipe(multiply(10))).toEqual(expected);
      expectSubscriptions(input.subscriptions).toBe(subs);
    });
  });
});
