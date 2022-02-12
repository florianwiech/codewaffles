import { css } from "styled-components";
import typography from "@primer/primitives/dist/js/typography/normal";

export const styledSearch = css`
  .cm-panel.cm-search {
    input.cm-textfield {
      width: 200px;
      padding: 3px 12px;

      color: ${({ theme }) => theme.checks.inputText};
      background: ${({ theme }) => theme.checks.inputBg};
      box-shadow: ${({ theme }) => theme.checks.inputShadow};
      border-radius: 6px;

      font-size: ${typography.fontSize[0]};

      border: 1px solid ${({ theme }) => theme.border.default};
      outline: none;

      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.checks.inputPlaceholderText};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.accent.emphasis};
      }
    }

    label {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    button.cm-button {
      font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
        "Cantarell", "Fira Sans", "Open Sans", "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
      font-size: ${typography.fontSize[0]};
      padding: 3px 12px;

      background: ${({ theme }) => theme.btn.bg};
      color: ${({ theme }) => theme.btn.text};
      border: 1px solid ${({ theme }) => theme.btn.border};
      border-radius: 6px;
    }

    button[name="close"] {
      color: ${({ theme }) => theme.fg.default};
    }
  }
`;
