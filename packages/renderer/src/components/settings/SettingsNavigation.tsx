import { FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as GeneralIcon } from "bootstrap-icons/icons/gear-fill.svg";

const StyledNavigation = styled.nav`
  text-align: center;
  background-color: ${({ theme }) => theme.canvas.default};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  -webkit-app-region: drag;
  user-select: none;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;

    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

const StyledNavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;
  margin: 5px 1px;
  border-radius: 6px;
  -webkit-app-region: no-drag;
  text-decoration: none;
  color: ${({ theme }) => theme.fg.default};
  cursor: default;

  svg {
    width: 24px;
    height: 24px;
    padding: 2px;
  }

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.neutral.subtle};
  }

  &.active {
    color: ${({ theme }) => theme.accent.emphasis};
  }
`;

export const SettingsNavigation: FC = () => {
  return (
    <StyledNavigation>
      <ul>
        <li>
          <StyledNavItem to="general">
            <GeneralIcon />
            <span>General</span>
          </StyledNavItem>
        </li>
      </ul>
    </StyledNavigation>
  );
};
