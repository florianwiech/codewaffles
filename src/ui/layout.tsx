import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";
import { useObservable } from "../shared/hooks/useObservable";
import { GlobalStyle } from "./styles";
import { AppearanceState, theme$, updateAppearance$ } from "./appearance";
import { useBrowserAppearanceListener } from "./utils/browserColorSchemeListener";
import { useBrowserCrossTabSync } from "./utils/browserCrossTabSync";

export const Layout: React.FC = ({ children }) => {
  const theme = useObservable(theme$);

  useEffect(() => {
    const sub = updateAppearance$.subscribe();
    return () => sub.unsubscribe();
  }, []);

  useBrowserAppearanceListener();
  useBrowserCrossTabSync();

  return (
    <ThemeProvider theme={theme === AppearanceState.DARK ? dark : light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
