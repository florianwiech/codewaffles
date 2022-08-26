import type { Rectangle } from "electron";

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
};

export type SettingsWindowState = {
  x?: number;
  y?: number;
  displayBounds?: Rectangle;
};
