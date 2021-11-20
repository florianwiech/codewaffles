import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import UAParser from "ua-parser-js";

const isAppleDevice = () => {
  const osName = new UAParser().getOS().name;
  return osName && ["Mac OS", "iOS"].includes(osName);
};

export const useKeyPress = (
  key: string,
  callback: (event: KeyboardEvent) => void,
  metaKey = true,
  node: HTMLElement | null = null
) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const optionKey = metaKey
        ? isAppleDevice()
          ? event.metaKey
          : event.ctrlKey
        : true;

      if (optionKey && event.key === key) {
        callbackRef.current(event);
      }
    },
    [key, metaKey]
  );

  useEffect(() => {
    if (node) {
      node.addEventListener("keydown", handleKeyPress);
      return () => node.removeEventListener("keydown", handleKeyPress);
    } else {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [handleKeyPress, node]);
};
