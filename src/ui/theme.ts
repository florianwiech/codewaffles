import { DefaultTheme } from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
};

export const base = {
  fontFamily:
    '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Open Sans", "Helvetica Neue", sans-serif, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  fontFamilyMono:
    '"SFMono Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  zIndex: 100,
};

export const theme: DefaultTheme = {
  ...base,

  primaryColor: "var(--color-primary)",
  secondaryColor: "var(--color-secondary)",

  textColor: "var(--color-text)",
  textColorSubtle: "var(--color-text-subtle)",

  backgroundColor: "var(--color-main-bg)",
  backgroundColorSubtle: "var(--color-subtle-bg)",
  backgroundColorInvert: "var(--color-invert-bg)",

  borderColor: "var(--color-border)",
};
