import { createGlobalStyle, css } from "styled-components";

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

export const GlobalStyle = createGlobalStyle`
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
