import { AppearanceState } from "@codewaffle/components";
import { APPEARANCE_STORAGE } from "./appearance-keys";

export const getInitialAppearance = (): AppearanceState => {
  try {
    const themeAppearance = window.localStorage.getItem(APPEARANCE_STORAGE);

    if (themeAppearance === AppearanceState.DARK || themeAppearance === AppearanceState.LIGHT) {
      return themeAppearance;
    }
  } catch (e) {
    // ignore
  }
  return AppearanceState.SYSTEM;
};
