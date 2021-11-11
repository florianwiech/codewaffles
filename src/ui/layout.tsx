import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { BehaviorSubject } from "rxjs";
import { GlobalStyle } from "./styles";

export enum ThemeState {
  SYSTEM = "system",
  DARK = "dark",
  LIGHT = "light",
}

export const theme$ = new BehaviorSubject<ThemeState>(ThemeState.SYSTEM);

export const getActiveAppearance = (): ThemeState => {
  try {
    const themeAppearance = window.localStorage.getItem("themeAppearance");
    if (themeAppearance === "dark") {
      return ThemeState.DARK;
    } else if (themeAppearance === "light") {
      return ThemeState.LIGHT;
    } else {
      return ThemeState.SYSTEM;
    }
  } catch (e) {
    return ThemeState.SYSTEM;
  }
};

export const updateAppearance = (next: ThemeState) => {
  const prefersDarkAppearance =
    typeof window !== undefined &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  switch (next) {
    case ThemeState.SYSTEM:
      theme$.next(next);
      localStorage.removeItem("themeAppearance");

      if (prefersDarkAppearance) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
      break;
    case ThemeState.LIGHT:
      theme$.next(next);
      localStorage.setItem("themeAppearance", ThemeState.LIGHT);
      document.documentElement.setAttribute("data-theme", "light");
      break;
    case ThemeState.DARK:
      theme$.next(next);
      localStorage.setItem("themeAppearance", next);
      document.documentElement.setAttribute("data-theme", "dark");
      break;
  }
};

export const emitAppearance = (next: ThemeState) => {
  const channel = new BroadcastChannel("penstack-appearance");
  channel.postMessage(next);
  channel.close();
};

export const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    const handleSystemThemeChange = () => {
      const appearance = getActiveAppearance();
      updateAppearance(appearance);
      emitAppearance(appearance);
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

  useEffect(() => {
    const channel = new BroadcastChannel("penstack-appearance");
    channel.onmessage = function(e) {
      let { data } = e;
      if (data !== theme$.value) {
        updateAppearance(data);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export const useLayout = () => {
  const [theme, setTheme] = useState<Omit<ThemeState, "system">>("dark");

  useEffect(() => {
    const prefersDarkAppearance =
      typeof window !== undefined &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const subscription = theme$.subscribe((next) => {
      if (next === ThemeState.SYSTEM) {
        if (prefersDarkAppearance) next = ThemeState.DARK;
        else next = ThemeState.LIGHT;
      }
      setTheme(next);
    });

    return () => subscription.unsubscribe();
  }, []);

  return theme;
};
