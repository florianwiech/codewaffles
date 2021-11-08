import React, { useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { cssColors, theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  ${cssColors}
  html, body {
    margin: 0;
    padding: 0;

    color: var(--color-text);
    background-color: var(--color-main-bg);

    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 14px;
    line-height: 21px;
  }
`;

export enum ThemeState {
  SYSTEM = "system",
  DARK = "dark",
  LIGHT = "light",
}

export const getActiveAppearance = (): ThemeState => {
  const themeAppearance = localStorage.getItem("themeAppearance");
  if (themeAppearance === "dark") {
    return ThemeState.DARK;
  } else if (themeAppearance === "light") {
    return ThemeState.LIGHT;
  } else {
    return ThemeState.SYSTEM;
  }
};

export const updateAppearance = (next: ThemeState) => {
  const prefersDarkAppearance =
    typeof window !== undefined &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  switch (next) {
    case ThemeState.SYSTEM:
      localStorage.removeItem("themeAppearance");

      if (prefersDarkAppearance) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
      break;
    case ThemeState.LIGHT:
      localStorage.setItem("themeAppearance", ThemeState.LIGHT);
      document.documentElement.setAttribute("data-theme", "light");
      break;
    case ThemeState.DARK:
      localStorage.setItem("themeAppearance", ThemeState.DARK);
      document.documentElement.setAttribute("data-theme", "dark");
      break;
  }
};

export const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    const handleSystemThemeChange = () => {
      const appearance = getActiveAppearance();
      updateAppearance(appearance);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleSystemThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
