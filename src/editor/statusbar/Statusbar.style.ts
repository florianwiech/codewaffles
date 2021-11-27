import styled from "styled-components";

export const Spacer = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
`;

export const StyledStatusbar = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0 7px;

  & > * {
    padding: 0 7px;
  }
`;
