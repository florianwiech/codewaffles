import { BehaviorSubject, EMPTY, fromEvent, mapTo, withLatestFrom } from "rxjs";
import { filter, map } from "rxjs/operators";
import { AppearanceState } from "../index";

export const APPEARANCE_STORAGE = "themeAppearance";

export const getNativeTheme = () =>
  typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(prefers-color-scheme: dark)").matches
    ? AppearanceState.LIGHT
    : AppearanceState.DARK;

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

export const getInitialTheme = (): Omit<AppearanceState, "system"> => {
  const initialAppearance = getInitialAppearance();
  return initialAppearance === AppearanceState.SYSTEM ? getNativeTheme() : initialAppearance;
};

export const changeAppearance = (nextAppearance: AppearanceState) => {
  if (nextAppearance === AppearanceState.SYSTEM) {
    localStorage.removeItem(APPEARANCE_STORAGE);
  } else {
    localStorage.setItem(APPEARANCE_STORAGE, nextAppearance);
  }

  webAppearance$.next(nextAppearance);
  webTheme$.next(nextAppearance === AppearanceState.SYSTEM ? getNativeTheme() : nextAppearance);
};

export const getColorSchemeChange = () => {
  if (typeof window === "undefined" || window?.matchMedia === undefined) return EMPTY;

  return fromEvent<MediaQueryListEvent>(window.matchMedia("(prefers-color-scheme: dark)"), "change").pipe(
    map(({ matches }) => matches),
    withLatestFrom(webAppearance$, webTheme$),

    filter(([prefersDarkMode, appearance, theme]) => {
      return appearance !== AppearanceState.SYSTEM ? false : !(prefersDarkMode && theme === AppearanceState.DARK);
    }),

    mapTo(AppearanceState.SYSTEM),
  );
};

export const webAppearance$ = new BehaviorSubject<AppearanceState>(getInitialAppearance());
export const webTheme$ = new BehaviorSubject<Omit<AppearanceState, "system">>(getInitialAppearance());
