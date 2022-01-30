import { css } from "styled-components";
import { size } from "@codewaffle/components";

export const styledNotification = css`
  .cm-panel.cm-notification {
    position: absolute;
    bottom: 33px;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > div {
      width: 100%;
      max-width: ${size.mobileL};
      margin: 0 5px;
      padding: 8px 15px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      color: ${({ theme }) => theme.fg.onEmphasis};
      background: ${({ theme }) => theme.neutral.emphasisPlus};
      border-radius: 6px;
      box-shadow: ${({ theme }) => theme.shadow.medium};

      & > button {
        height: 21px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        padding: 0 0 0 6px;

        color: ${({ theme }) => theme.fg.onEmphasis};
        background: transparent;
        border: none;
        outline: none;
        box-shadow: none;
      }

      &.info {
        background: ${({ theme }) => theme.accent.emphasis};
      }

      &.warning {
        background: ${({ theme }) => theme.attention.emphasis};
      }

      &.danger {
        background: ${({ theme }) => theme.danger.emphasis};
      }
    }
  }
`;
