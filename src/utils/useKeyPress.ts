import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import UAParser from "ua-parser-js";

const OSName = new UAParser().getOS().name;
const isAppleDevice = OSName && ["Mac OS", "iOS"].includes(OSName);

export const useKeyPress = (
  key: string,
  callback: (event: KeyboardEvent) => void,
  node = null
) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {

      const pressedOptionKey = isAppleDevice ? event.metaKey : event.ctrlKey;

      if (pressedOptionKey && event.key === key) {
        callbackRef.current(event);
      }
    },
    [key]
  );

  useEffect(() => {
    const targetNode = node ?? document;

    targetNode && targetNode.addEventListener("keydown", handleKeyPress);

    return () =>
      targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, node]);
};
