import { BehaviorSubject } from "rxjs";
import { convertAppearanceToTheme } from "./operators/convertAppearanceToTheme";
import { getInitialAppearance } from "./utils/getInitialAppearance";

export enum AppearanceState {
  SYSTEM = "system",
  DARK = "dark",
  LIGHT = "light",
}

export const appearance$ = new BehaviorSubject<AppearanceState>(
  getInitialAppearance(),
);
export const previousAppearance$ = new BehaviorSubject<AppearanceState>(
  getInitialAppearance(),
);

export const theme$ = appearance$.pipe(convertAppearanceToTheme());

export const changeAppearance = (next: AppearanceState, emit = true) => {
  if (!emit) previousAppearance$.next(next);
  appearance$.next(next);
};
