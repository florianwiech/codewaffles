import { css } from "styled-components";
import { device } from "../../ui";

export const styledStatusbar = css`
  .cm-panel.cm-statusbar {
    display: flex;
    flex-direction: row;

    padding: 0 7px;

    overflow-x: auto;

    & > * {
      padding: 0 7px;
      color: ${({ theme }) => theme.fg.muted};
      background-color: ${({ theme }) => theme.canvas.default};
      flex-shrink: 0;
    }

    .spacer {
      display: flex;
      flex-direction: row;
      -webkit-box-flex: 1;
      flex: 1;
    }

    .cursor-position {
      display: flex;
      flex-direction: row;

      .single-selection {
        display: none;
        @media screen and ${device.mobileL} {
          display: block;
          margin-left: 5px;
        }
      }
    }

    .language-switch,
    .appearance-switch {
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
