import { FC, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";
import { GlobalStyle } from "./styles";

export enum AppearanceState {
  SYSTEM = "system",
  DARK = "dark",
  LIGHT = "light",
}

export const getBackgroundColor = (shouldUseDarkColors: boolean) =>
  shouldUseDarkColors ? dark.canvas.default : light.canvas.default;

type Props = {
  children?: ReactNode;
  theme?: Omit<AppearanceState, "system">;
};
export const Layout: FC<Props> = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme === AppearanceState.DARK ? dark : light}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
};
