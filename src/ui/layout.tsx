import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";
import { GlobalStyle } from "./styles";
import { AppearanceState, theme$ } from "./appearance";
import { useBrowserColorSchemeListener } from "./useBrowserColorSchemeListener";
import { useCrossTabAppearanceSync } from "./useCrossTabAppearanceSync";

export const Layout: React.FC = ({ children }) => {
  const theme = useLayout();
  useBrowserColorSchemeListener();
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
    const subscription = theme$.subscribe(setTheme);
    return () => subscription.unsubscribe();
  }, []);

  return theme;
};
