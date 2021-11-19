import { useEffect } from "react";
import {
  emitAppearance,
  getActiveAppearance,
  updateAppearance,
} from "./appearance";

export const useBrowserAppearanceListener = () => {
  useEffect(() => {
    if (!window.matchMedia) return;

    const handleSystemThemeChange = () => {
      const appearance = getActiveAppearance();
      updateAppearance(appearance);
      emitAppearance(appearance);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleSystemThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemThemeChange);
    };
  }, []);
};
