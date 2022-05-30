import { act, cleanup, renderHook } from "@testing-library/react";
import { BehaviorSubject, Subscription } from "rxjs";
import { useBehaviorSubject } from "./useBehaviorSubject";

describe("useBehaviorSubject", () => {
  it("should have initial state with data", () => {
    const test$ = new BehaviorSubject<string>("initial");

    const { result } = renderHook(() => useBehaviorSubject(test$));

    expect(result.current).toBe("initial");
  });

  it("should set state on  new emits", async () => {
    const test$ = new BehaviorSubject<string>("test");

    const { result } = renderHook(() => useBehaviorSubject(test$));

    act(() => {
      test$.next("next");
    });

    expect(result.current).toBe("next");
  });

  it("should cleanup subscription", () => {
    const test$ = new BehaviorSubject<string>("test");

    const subscription = new Subscription();
    const unsubscribeSpy = jest.spyOn(subscription, "unsubscribe");

    jest.spyOn(test$, "subscribe").mockReturnValue(subscription);

    renderHook(() => useBehaviorSubject(test$));

    cleanup();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
