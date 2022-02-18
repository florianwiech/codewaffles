import { renderHook } from "@testing-library/react-hooks";
import { useKeyPress } from "./useKeyPress";

const origin = global.navigator.userAgent;
const cleared = Symbol("clear");
let fakeUserAgent: any = null;

Object.defineProperty(global.navigator, "userAgent", {
  get() {
    return fakeUserAgent === cleared ? origin : fakeUserAgent || "";
  },
});

export const clear = () => {
  fakeUserAgent = cleared;
};

export const mockUserAgent = (agent: string) => {
  fakeUserAgent = agent;
};

export const userAgentWindowsMock = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0";
export const userAgentMacOSMock = "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0";

describe("useKeyPress", () => {
  describe("should fire callback", () => {
    test("on custom node", () => {
      const key = "k";
      const callback = jest.fn();
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
      const callback = jest.fn();

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
      const callback = jest.fn();

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
        userAgent: userAgentMacOSMock,
        key: "metaKey",
      },
      {
        label: "windows & linux devices",
        userAgent: userAgentWindowsMock,
        key: "ctrlKey",
      },
    ];

    devices.forEach((device) => {
      describe(`${device.label}`, () => {
        const key = "p";
        let callback: () => void;
        beforeEach(() => {
          callback = jest.fn();
          mockUserAgent(device.userAgent);
        });

        afterEach(() => {
          clear();
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
