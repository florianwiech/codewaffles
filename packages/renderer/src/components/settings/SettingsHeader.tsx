import { FC } from "react";
import styled from "styled-components";
import { SettingsNavigation } from "./SettingsNavigation";

type Props = { onTitleBarClick?: () => void };

export const MAC_OS_TITLE_BAR_HEIGHT = "27px";

const StyledTitleBar = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.canvas.default};
  -webkit-app-region: drag;
  height: ${MAC_OS_TITLE_BAR_HEIGHT};
  line-height: ${MAC_OS_TITLE_BAR_HEIGHT};
  font-weight: bold;

  user-select: none;
`;

export const SettingsHeader: FC<Props> = ({ onTitleBarClick }) => {
  return (
    <>
      <StyledTitleBar onDoubleClick={() => onTitleBarClick?.()}>Preferences</StyledTitleBar>
      <SettingsNavigation />
    </>
  );
};
