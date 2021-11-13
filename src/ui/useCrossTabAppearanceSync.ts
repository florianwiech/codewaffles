import { useEffect } from "react";
import { appearance$, updateAppearance } from "./appearance";

export const useCrossTabAppearanceSync = () => {
  useEffect(() => {
    if (window.BroadcastChannel === undefined) return;

    const channel = new BroadcastChannel("appearance");

    channel.onmessage = function (e) {
      let { data } = e;
      if (data !== appearance$.value) {
        updateAppearance(data);
      }
    };

    return () => {
      channel.close();
    };
  }, []);
};
