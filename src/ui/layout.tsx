import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import dark from "@primer/primitives/dist/ts/colors/dark";
import light from "@primer/primitives/dist/ts/colors/light";
import { GlobalStyle } from "./styles";
import { appearance$, AppearanceState } from "./appearance";
import { useBrowserAppearanceListener } from "./useBrowserAppearanceListener";
import { useCrossTabAppearanceSync } from "./useCrossTabAppearanceSync";

export const Layout: React.FC = ({ children }) => {
  const theme = useLayout();
  useBrowserAppearanceListener();
  useCrossTabAppearanceSync();

  return (
    <ThemeProvider theme={theme === AppearanceState.DARK ? dark : light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export const useLayout = () => {
  const [theme, setTheme] = useState<Omit<AppearanceState, "system">>("dark");

  useEffect(() => {
    const subscription = appearance$.subscribe((next) => {
      const prefersDarkAppearance =
        typeof window !== undefined &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (next === AppearanceState.SYSTEM) {
        if (prefersDarkAppearance) next = AppearanceState.DARK;
        else next = AppearanceState.LIGHT;
      }
      setTheme(next);
    });

    return () => subscription.unsubscribe();
  }, []);

  return theme;
};
