import { fromEvent, mapTo, withLatestFrom } from "rxjs";
import { filter, map } from "rxjs/operators";
import { useEffect } from "react";
import {
  appearance$,
  AppearanceState,
  changeAppearance,
  theme$,
} from "../appearance";

export const prefersDarkMode$ = fromEvent<MediaQueryListEvent>(
  window.matchMedia("(prefers-color-scheme: dark)"),
  "change",
).pipe(map(({ matches }) => matches));

export const shouldUpdateTheme$ = prefersDarkMode$.pipe(
  withLatestFrom(appearance$, theme$),

  filter(([prefersDarkMode, appearance, theme]) => {
    if (appearance !== AppearanceState.SYSTEM) return false;

    return !(prefersDarkMode && theme === AppearanceState.DARK);
  }),
  mapTo(AppearanceState.SYSTEM),
);

export const useBrowserAppearanceListener = () => {
  useEffect(() => {
    if (!window.matchMedia) return;

    const sub = shouldUpdateTheme$.subscribe((next) => {
      changeAppearance(next, false);
    });
    return () => sub.unsubscribe();
  }, []);
};
