import { FC } from "react";
import styled from "styled-components";

type Props = { title: string; platform: string; onTitleBarClick: () => void };

const StyledTitleBar = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.canvas.default};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  -webkit-app-region: drag;
  height: 27px;
  line-height: 27px;

  user-select: none;
`;

export const MacOsTitleBar: FC<Props> = ({ title, platform, onTitleBarClick }) => {
  if (platform !== "darwin") return null;

  return <StyledTitleBar onDoubleClick={() => onTitleBarClick()}>{title}</StyledTitleBar>;
};
