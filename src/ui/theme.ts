import { css, DefaultTheme } from "styled-components";

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

export const cssColors = css`
  :root {
    --color-primary: #ec775c;
    --color-secondary: #539bf5;

    --color-text: #24292f;
    --color-text-subtle: #57606a;
    
    --color-main-bg: #11111;
    --color-subtle-bg: #f6f8fa;
    --color-invert-bg: #f6f8fa;
    
    --color-border: #d0d7de;
  }

  [data-theme="dark"] {
    --color-text: #adbac7;
    --color-text-subtle: #768390;
    
    --color-main-bg: #22272e;
    --color-subtle-bg: #2d333b;
    --color-invert-bg: #1c2128;
    
    --color-border: #444c56;
  }
`;