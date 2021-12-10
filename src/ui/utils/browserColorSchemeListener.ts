import { EMPTY, fromEvent, mapTo, withLatestFrom } from "rxjs";
import { filter, map } from "rxjs/operators";
import { useEffect } from "react";
import {
  appearance$,
  AppearanceState,
  changeAppearance,
  theme$,
} from "../appearance";

export const shouldUpdateTheme = ([prefersDarkMode, appearance, theme]: [
  boolean,
  AppearanceState,
  Omit<AppearanceState, "system">,
]) => {
  if (appearance !== AppearanceState.SYSTEM) return false;
  return !(prefersDarkMode && theme === AppearanceState.DARK);
};

export const getColorSchemeChange = () => {
  if (typeof window === undefined || window?.matchMedia === undefined)
    return EMPTY;

  return fromEvent<MediaQueryListEvent>(
    window.matchMedia("(prefers-color-scheme: dark)"),
    "change",
  ).pipe(
    map(({ matches }) => matches),
    withLatestFrom(appearance$, theme$),
    filter(shouldUpdateTheme),
    mapTo(AppearanceState.SYSTEM),
  );
};

export const useBrowserAppearanceListener = () => {
  useEffect(() => {
    if (!window.matchMedia) return;

    const sub = getColorSchemeChange().subscribe((next) => {
      changeAppearance(next, false);
    });
    return () => sub.unsubscribe();
  }, []);
};
