import styled from "styled-components";
import typography from "@primer/primitives/dist/ts/typography/normal";
import { FC, KeyboardEventHandler } from "react";

export const StyledInput = styled.input`
  width: 100%;
  padding: 4px;

  color: ${({ theme }) => theme.fg.default};
  background-color: transparent;

  font-size: ${typography.fontSize[4]};

  border: none;
  border-radius: 8px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${({ theme }) => theme.checks.inputPlaceholderText};
  }

  &::-moz-placeholder {
    /* Firefox 19+ */
    color: ${({ theme }) => theme.checks.inputPlaceholderText};
  }

  &:-ms-input-placeholder {
    /* IE 10+ */
    color: ${({ theme }) => theme.checks.inputPlaceholderText};
  }

  &:-moz-placeholder {
    /* Firefox 18- */
    color: ${({ theme }) => theme.checks.inputPlaceholderText};
  }

  &:disabled {
    background: ${({ theme }) => theme.input.disabledBg};
  }
`;

export const Input: FC<{
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}> = ({ onKeyUp, onKeyDown }) => {
  return (
    <StyledInput
      type="text"
      placeholder="Search command..."
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
};