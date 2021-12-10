import { AppearanceState } from "../appearance";
import { shouldUpdateTheme } from "./browserColorSchemeListener";

describe("shouldUpdateTheme", () => {
  it("should switch from light to dark", () => {
    expect(
      shouldUpdateTheme([true, AppearanceState.SYSTEM, AppearanceState.LIGHT]),
    ).toBeTruthy();
  });
  it("should switch from dark to light", () => {
    expect(
      shouldUpdateTheme([false, AppearanceState.SYSTEM, AppearanceState.DARK]),
    ).toBeTruthy();
  });
  it("should do nothing when system theme not enabled", () => {
    expect(
      shouldUpdateTheme([false, AppearanceState.DARK, AppearanceState.DARK]),
    ).toBeFalsy();
    expect(
      shouldUpdateTheme([true, AppearanceState.LIGHT, AppearanceState.LIGHT]),
    ).toBeFalsy();
  });
});
