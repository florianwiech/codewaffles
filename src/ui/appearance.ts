import { BehaviorSubject, map } from "rxjs";

export enum AppearanceState {
  SYSTEM = "system",
  DARK = "dark",
  LIGHT = "light",
}

// fyi: the same attribute is used in the index.html
// so if you want to change the attribute name you should also change it
// in the index.html
const APPEARANCE_ATTRIBUTE = "data-theme";

export const appearance$ = new BehaviorSubject<AppearanceState>(
  AppearanceState.SYSTEM
);

export const theme$ = appearance$.pipe(
  map((appearance) => ({
    appearance,
    prefersDarkAppearance:
      typeof window !== undefined &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  })),

  map(({ appearance, prefersDarkAppearance }) => {
    if (appearance !== AppearanceState.SYSTEM) {
      return appearance;
    }

    if (prefersDarkAppearance) {
      appearance = AppearanceState.DARK;
    } else {
      appearance = AppearanceState.LIGHT;
    }

    return appearance;
  })
);

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
