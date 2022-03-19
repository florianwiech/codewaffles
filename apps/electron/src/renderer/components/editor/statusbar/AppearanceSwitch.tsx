import React, { ChangeEvent, FC } from "react";
import { AppearanceState } from "@codewaffle/components";

export type AppearanceSwitchProps = {
  appearance: AppearanceState;
  onAppearanceChange: (next: AppearanceState) => void;
};

export const AppearanceSwitch: FC<AppearanceSwitchProps> = ({ appearance, onAppearanceChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    onAppearanceChange(event.target.value as AppearanceState);

  return (
    <select value={appearance} onChange={handleChange} className="appearance-switch" aria-label="Select appearance">
      <option value={AppearanceState.SYSTEM}>system</option>
      <option value={AppearanceState.DARK}>dark</option>
      <option value={AppearanceState.LIGHT}>light</option>
    </select>
  );
};
