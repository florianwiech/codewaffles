import React, { FC } from "react";
import { AppearanceState } from "../theme";

export const SettingsGeneral: FC = () => {
  return (
    <>
      <h2>Appearance</h2>
      <button onClick={() => window.settings?.changeAppearance(AppearanceState.SYSTEM)}>System</button>
      <button onClick={() => window.settings?.changeAppearance(AppearanceState.DARK)}>Dark</button>
      <button onClick={() => window.settings?.changeAppearance(AppearanceState.LIGHT)}>Light</button>
    </>
  );
};
