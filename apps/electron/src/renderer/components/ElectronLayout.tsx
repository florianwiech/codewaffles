import { FC, useEffect, useState } from "react";
import { EMPTY, fromEvent, map } from "rxjs";
import { Layout } from "@codewaffle/components";
import { AppearanceState } from "../../types";

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

export const ElectronLayout: FC = ({ children }) => {
  const [theme, setTheme] = useState<Omit<AppearanceState, "system">>(getInitialTheme());

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe(setTheme);

    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
