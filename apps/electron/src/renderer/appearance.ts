import { BehaviorSubject, EMPTY, fromEvent, map } from "rxjs";
import { AppearanceState } from "./components/theme";

export const getInitialTheme = () =>
  typeof window !== undefined && window.matchMedia && !window.matchMedia("(prefers-color-scheme: dark)").matches
    ? AppearanceState.LIGHT
    : AppearanceState.DARK;

export const getColorSchemeChange = () => {
  if (typeof window === undefined || window?.matchMedia === undefined) return EMPTY;

  return fromEvent<MediaQueryListEvent>(window.matchMedia("(prefers-color-scheme: dark)"), "change").pipe(
    map(({ matches }) => matches),
    map((prefersDark) => (prefersDark ? AppearanceState.DARK : AppearanceState.LIGHT)),
  );
};

export const theme$ = new BehaviorSubject<Omit<AppearanceState, "system">>(getInitialTheme());
