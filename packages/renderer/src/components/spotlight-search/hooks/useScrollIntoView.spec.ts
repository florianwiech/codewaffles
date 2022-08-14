import { describe, expect, it } from "vitest";
import { isElementVisibleInHorizontalList, shouldScrollIntoViewAlignTop } from "./useScrollIntoView";

describe("isElementVisibleInHorizontalList", () => {
  const holder = { bottom: 650, height: 400, top: 250 } as DOMRect;

  const elementChecks = [
    {
      name: "should first top element to be visible",
      el: { height: 34, top: 250, bottom: 284 } as DOMRect,
      visible: true,
    },
    {
      name: "should first top element to be out of view",
      el: { height: 34, top: 249, bottom: 283 } as DOMRect,
      visible: false,
    },

    {
      name: "should first bottom element to be visible",
      el: { height: 34, top: 616, bottom: 650 } as DOMRect,
      visible: true,
    },
    {
      name: "should first bottom element to be out of view",
      el: { height: 34, top: 617, bottom: 651 } as DOMRect,
      visible: false,
    },
  ];

  elementChecks.forEach(({ name, el, visible }) => {
    it(`${name}`, () => {
      expect(isElementVisibleInHorizontalList(el, holder)).toBe(visible);
    });
  });
});

describe("shouldScrollIntoViewAlignTop", () => {
  const holder = { bottom: 650, height: 400, top: 250 } as DOMRect;

  it("should align top", () => {
    const el = { height: 34, top: 249, bottom: 283 } as DOMRect;
    expect(shouldScrollIntoViewAlignTop(el, holder)).toBeTruthy();
  });

  it("should align bottom", () => {
    const el = { height: 34, top: 617, bottom: 651 } as DOMRect;
    expect(shouldScrollIntoViewAlignTop(el, holder)).toBeFalsy();
  });
});
