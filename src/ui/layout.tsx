import React from "react";
import { ThemeProvider } from "styled-components";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";
import { useObservable } from "../shared/hooks/useObservable";
import { GlobalStyle } from "./styles";
import { AppearanceState, theme$ } from "./appearance";
import { useBrowserAppearanceListener } from "./useBrowserAppearanceListener";
import { useCrossTabAppearanceSync } from "./useCrossTabAppearanceSync";

export const Layout: React.FC = ({ children }) => {
  const theme = useObservable(theme$);
  useBrowserAppearanceListener();
  useCrossTabAppearanceSync();

  return (
    <ThemeProvider theme={theme === AppearanceState.DARK ? dark : light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
