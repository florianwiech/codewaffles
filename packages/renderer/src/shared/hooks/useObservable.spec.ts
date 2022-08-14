import { describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { useObservable } from "./useObservable";

describe("useObservable", () => {
  it("should have undefined initial state", () => {
    const test$ = new Subject<string>();

    const { result } = renderHook(() => useObservable(test$));

    expect(result.current).toBe(undefined);
  });

  it("should have initial state with data", () => {
    const test$ = new BehaviorSubject<string>("initial");

    const { result } = renderHook(() => useObservable(test$));

    expect(result.current).toBe("initial");
  });

  it("should set state on  new emits", async () => {
    const test$ = new Subject<string>();

    const { result } = renderHook(() => useObservable(test$));

    act(() => {
      test$.next("next");
    });

    expect(result.current).toBe("next");
  });

  it("should cleanup subscription", () => {
    const test$ = new Subject<string>();

    const subscription = new Subscription();
    const unsubscribeSpy = vi.spyOn(subscription, "unsubscribe");

    vi.spyOn(test$, "subscribe").mockReturnValue(subscription);

    renderHook(() => useObservable(test$));

    cleanup();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
