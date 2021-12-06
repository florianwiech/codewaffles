import { useEffect } from "react";
import { AppearanceState, changeAppearance } from "../appearance";
import { APPEARANCE_CHANNEL } from "./appearance-keys";

export const useBrowserCrossTabSync = () => {
  useEffect(() => {
    if (window?.BroadcastChannel === undefined) return;

    const channel = new BroadcastChannel(APPEARANCE_CHANNEL);

    channel.onmessage = function (message: MessageEvent<AppearanceState>) {
      let { data } = message;

      changeAppearance(data, false);
    };

    return () => {
      channel.close();
    };
  }, []);
};
