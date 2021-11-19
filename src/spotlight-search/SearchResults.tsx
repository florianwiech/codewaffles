import styled from "styled-components";
import typography from "@primer/primitives/dist/js/typography/normal";

export const StyledSearchResults = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;

  border-top: 1px solid ${({ theme }) => theme.border.default};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  box-sizing: border-box;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    width: 100%;
    padding: 5px 10px;

    color: ${({ theme }) => theme.fg.default};
    background-color: transparent;

    text-align: left;
    font-size: ${typography.fontSize[2]};

    border-radius: 6px;
    border: none;
    cursor: default;
    box-sizing: border-box;

    &.active {
      background-color: ${({ theme }) => theme.canvas.subtle};
    }
  }
`;
