import { describe, expect, it } from "vitest";
import { windowWithinBounds } from "./window-observer";

describe("windowWithinBounds", () => {
  it("should find the stuff", () => {
    const state = {
      width: 1680,
      height: 1025,
      displayBounds: { x: 0, y: 0, width: 1680, height: 1050 },
      x: 0,
      y: 25,
      isMaximized: true,
      isFullScreen: false,
    };
    const display = { x: 0, y: 0, width: 1680, height: 1050 };

    expect(windowWithinBounds(state, display)).toBeTruthy();
  });
});
