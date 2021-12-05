import { BehaviorSubject } from "rxjs";
import { convertAppearanceToTheme } from "./utils/convertAppearanceToTheme";

export enum AppearanceState {
  SYSTEM = "system",
  DARK = "dark",
  LIGHT = "light",
}

// FYI: the same attribute values are used in the index.html
// so if you want to change an attribute value you should also change it there
const APPEARANCE_ATTRIBUTE = window.appearanceAttributeKey || "data-theme";
const APPEARANCE_STORAGE = window.appearanceStorageKey || "themeAppearance";

const getInitialAppearance = (): AppearanceState => {
  try {
    const themeAppearance = window.localStorage.getItem(APPEARANCE_STORAGE);

    if (
      themeAppearance === AppearanceState.DARK ||
      themeAppearance === AppearanceState.LIGHT
    ) {
      return themeAppearance;
    }
  } catch (e) {}
  return AppearanceState.SYSTEM;
};

export const appearance$ = new BehaviorSubject<AppearanceState>(
  getInitialAppearance(),
);

export const theme$ = appearance$.pipe(convertAppearanceToTheme());

export const getActiveAppearance = (): AppearanceState => {
  try {
    const themeAppearance = window.localStorage.getItem("themeAppearance");
    if (themeAppearance === "dark") {
      return AppearanceState.DARK;
    } else if (themeAppearance === "light") {
      return AppearanceState.LIGHT;
    } else {
      return AppearanceState.SYSTEM;
    }
  } catch (e) {
    return AppearanceState.SYSTEM;
  }
};

export const updateAppearance = (next: AppearanceState) => {
  const prefersDarkAppearance =
    typeof window !== undefined &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  switch (next) {
    case AppearanceState.SYSTEM:
      appearance$.next(next);
      localStorage.removeItem("themeAppearance");

      if (prefersDarkAppearance) {
        document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE, "dark");
      } else {
        document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE, "light");
      }
      break;
    case AppearanceState.LIGHT:
      appearance$.next(next);
      localStorage.setItem("themeAppearance", AppearanceState.LIGHT);
      document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE, "light");
      break;
    case AppearanceState.DARK:
      appearance$.next(next);
      localStorage.setItem("themeAppearance", next);
      document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE, "dark");
      break;
  }
};

export const emitAppearance = (next: AppearanceState) => {
  if (window.BroadcastChannel === undefined) return;

  const channel = new BroadcastChannel("appearance");
  channel.postMessage(next);
  channel.close();
};
