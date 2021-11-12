import { useEffect } from "react";
import { appearance$, updateAppearance } from "./appearance";

export const useCrossTabAppearanceSync = () => {
  useEffect(() => {
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
