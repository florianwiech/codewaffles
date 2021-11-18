import styled from "styled-components";

export const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 100;

  background: ${({ theme }) => theme.primer.canvas.backdrop};
`;

export const StyledSpotlight = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  width: 680px;
  max-width: 100%;
  // todo responsiveness
  margin: 0 20px;
  padding: 5px 10px;

  transform: translateX(-50%);

  z-index: 111;
  box-sizing: border-box;

  color: ${({ theme }) => theme.fg.default};
  background-color: ${({ theme }) => theme.canvas.default};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 8px;

  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
`;
