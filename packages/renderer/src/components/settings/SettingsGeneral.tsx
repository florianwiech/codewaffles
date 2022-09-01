import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { AppearanceState } from "../theme";

const StyledGeneralPage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: calc(100% - 97px);
  box-sizing: border-box;

  padding: 20px;
`;

const StyledAppearanceSwitch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 0;
  }
  select {
    color: ${({ theme }) => theme.fg.default};
    background-color: ${({ theme }) => theme.canvas.default};
    border: 1px solid ${({ theme }) => theme.border.default};
    border-radius: 6px;
    padding: 0 3px;
  }
`;

export const SettingsGeneral: FC = () => {
  const [appearance, setAppearance] = useState<AppearanceState>();

  useEffect(() => {
    window.settings?.getAppearance().then(setAppearance);
  }, []);

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as AppearanceState;
    await window.settings?.changeAppearance(next);
    setAppearance(next);
  };

  return (
    <StyledGeneralPage>
      <StyledAppearanceSwitch>
        <p>Choose Appearance</p>
        {appearance ? (
          <select
            value={appearance}
            onChange={handleChange}
            className="appearance-switch"
            aria-label="Select appearance"
          >
            <option value={AppearanceState.SYSTEM}>system</option>
            <option value={AppearanceState.DARK}>dark</option>
            <option value={AppearanceState.LIGHT}>light</option>
          </select>
        ) : null}
      </StyledAppearanceSwitch>
    </StyledGeneralPage>
  );
};
