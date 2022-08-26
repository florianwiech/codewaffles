import type { Rectangle } from "electron";
import type { AppearanceState } from "../../../shared/appearance-state";

export type State = {
  windowsState: {
    home: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
    };
    settings: SettingsWindowState;
  };
  appearance: AppearanceState;
};

export type SettingsWindowState = {
  x?: number;
  y?: number;
  displayBounds?: Rectangle;
};
