import { describe, beforeEach, it, expect, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useKeyPress } from "./useKeyPress";

describe("useKeyPress", () => {
  describe("should fire callback", () => {
    test("on custom node", () => {
      const key = "k";
      const callback = vi.fn();
      const node = document.createElement("div");

      renderHook(() => useKeyPress(key, callback, true, node));

      node.dispatchEvent(
        new KeyboardEvent("keydown", {
          key,
          metaKey: true,
          ctrlKey: true,
        }),
      );

      expect(callback).toHaveBeenCalled();
    });

    test("on document", () => {
      const key = "k";
      const callback = vi.fn();

      renderHook(() => useKeyPress(key, callback));

      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key,
          metaKey: true,
          ctrlKey: true,
        }),
      );

      expect(callback).toHaveBeenCalled();
    });

    test("without meta key", () => {
      const key = "?";
      const callback = vi.fn();

      renderHook(() => useKeyPress(key, callback, false));

      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key,
          metaKey: false,
          ctrlKey: false,
        }),
      );

      expect(callback).toHaveBeenCalled();
    });
  });

  describe("meta key", () => {
    const devices = [
      {
        label: "apple devices",
        key: "metaKey",
      },
      {
        label: "windows & linux devices",
        key: "ctrlKey",
      },
    ];

    devices.forEach((device) => {
      describe(`${device.label}`, () => {
        const key = "p";
        let callback: () => void;
        beforeEach(() => {
          callback = vi.fn();
        });

        it("should fire with meta key", () => {
          renderHook(() => useKeyPress(key, callback));

          document.dispatchEvent(new KeyboardEvent("keydown", { key, [device.key]: true }));

          expect(callback).toHaveBeenCalled();
        });
      });
    });
  });
});
