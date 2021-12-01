import { css } from "styled-components";

export const styledStatusbar = css`
  .cm-panel.cm-statusbar {
    & > * {
      color: ${({ theme }) => theme.fg.muted};
      background-color: ${({ theme }) => theme.canvas.default};
    }

    .language-switch {
      color: ${({ theme }) => theme.fg.muted};
      background-color: ${({ theme }) => theme.canvas.default};
      outline: none;
      border: none;
      appearance: none;
      text-align: center;

      &:hover {
        background-color: ${({ theme }) => theme.canvas.overlay};
      }
    }
  }
`;
