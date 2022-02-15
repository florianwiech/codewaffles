import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { AppearanceState } from "@codewaffle/components";

export function convertAppearanceToTheme(): OperatorFunction<AppearanceState, Omit<AppearanceState, "system">> {
  return map((appearance) => {
    if (appearance !== AppearanceState.SYSTEM) return appearance;

    const prefersDarkAppearance =
      typeof window !== undefined && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDarkAppearance) {
      return AppearanceState.DARK;
    } else {
      return AppearanceState.LIGHT;
    }
  });
}
