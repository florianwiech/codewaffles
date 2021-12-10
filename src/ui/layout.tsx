import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";
import { useObservable } from "../shared/hooks/useObservable";
import { GlobalStyle } from "./styles";
import { AppearanceState, theme$ } from "./appearance";
import { useBrowserAppearanceListener } from "./observables/browserColorSchemeListener";
import { useBrowserCrossTabSync } from "./observables/browserCrossTabSync";
import { getAppearanceChanges } from "./observables/getAppearanceChanges";

export const Layout: React.FC = ({ children }) => {
  const theme = useObservable(theme$);

  useEffect(() => {
    const sub = getAppearanceChanges().subscribe();
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
