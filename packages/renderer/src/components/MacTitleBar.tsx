import { FC } from "react";
import styled from "styled-components";

type Props = { title: string; platform: string; onTitleBarClick?: () => void };

export const MAC_OS_TITLE_BAR_HEIGHT = "27px";

const StyledTitleBar = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.canvas.default};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  -webkit-app-region: drag;
  height: ${MAC_OS_TITLE_BAR_HEIGHT};
  line-height: ${MAC_OS_TITLE_BAR_HEIGHT};
  font-weight: bold;

  user-select: none;
`;

export const MacTitleBar: FC<Props> = ({ title, platform, onTitleBarClick }) => {
  if (platform !== "darwin") return null;

  return <StyledTitleBar onDoubleClick={() => onTitleBarClick?.()}>{title}</StyledTitleBar>;
};
