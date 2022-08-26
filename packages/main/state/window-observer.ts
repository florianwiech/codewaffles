import type { BrowserWindow, Rectangle } from "electron";
import { screen } from "electron";

export type Config = {
  /**
   * The width that should be returned if no file exists yet.
   * @default 800
   */
  defaultWidth?: number;

  /**
   * The height that should be returned if no file exists yet.
   * @default 600
   */
  defaultHeight?: number;

  /**
   * Should we automatically maximize the window, if it was last closed maximized?
   * @default true
   */
  maximize: boolean;

  /**
   * Should we automatically restore the window to full screen, if it was last closed full screen?
   * @default true
   */
  fullScreen: boolean;

  setState: (state: WindowState) => void;
  getState: () => WindowState | undefined;
};

export type Options = Pick<Config, "setState" | "getState"> & Partial<Config>;

export type WindowState = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  isMaximized?: boolean;
  isFullScreen?: boolean;
  displayBounds?: Rectangle;
};

const isNumber = (input: unknown): input is number => Number.isInteger(input);

const isNormal = (win: BrowserWindow) => !win.isMaximized() && !win.isMinimized() && !win.isFullScreen();

const hasBounds = (state?: WindowState) =>
  state &&
  isNumber(state.x) &&
  isNumber(state.y) &&
  isNumber(state.width) &&
  state.width > 0 &&
  isNumber(state.height) &&
  state.height > 0;

export const windowWithinBounds = (state: WindowState, bounds: Rectangle) => {
  if (state.x === undefined || state.y === undefined) {
    return false;
  }
  return (
    state.x >= bounds.x &&
    state.y >= bounds.y &&
    state.x + state.width <= bounds.x + bounds.width &&
    state.y + state.height <= bounds.y + bounds.height
  );
};

export const windowObserver = (
  options: Options = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setState: () => {},
    getState: () => ({} as WindowState),
  },
) => {
  let state: WindowState = {} as WindowState;
  let winRef: BrowserWindow | null;
  let stateChangeTimer: NodeJS.Timeout | undefined = undefined;
  const eventHandlingDelay = 100;
  const config = Object.assign(
    {
      maximize: true,
      fullScreen: true,
    },
    options,
  );

  function resetStateToDefault() {
    const displayBounds = screen.getPrimaryDisplay().bounds;

    // Reset state to default values on the primary display
    state = {
      width: config.defaultWidth || 800,
      height: config.defaultHeight || 600,
      displayBounds,
    };
  }

  function ensureWindowVisibleOnSomeDisplay() {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(state, display.bounds);
    });

    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetStateToDefault();
    }
  }

  function validateState() {
    const isValid = state && (hasBounds(state) || state.isMaximized || state.isFullScreen);
    if (!isValid) {
      state = {} as WindowState;
      return;
    }

    if (hasBounds(state) && state.displayBounds) {
      ensureWindowVisibleOnSomeDisplay();
    }
  }

  function updateState(win?: BrowserWindow | null) {
    win = win || winRef;
    if (!win) {
      return;
    }
    // Don't throw an error when window was closed
    try {
      const winBounds = win.getBounds();
      if (isNormal(win)) {
        state.x = winBounds.x;
        state.y = winBounds.y;
        state.width = winBounds.width;
        state.height = winBounds.height;
      }
      state.isMaximized = win.isMaximized();
      state.isFullScreen = win.isFullScreen();
      state.displayBounds = screen.getDisplayMatching(winBounds).bounds;
    } catch (err) {
      // ignore
    }
  }

  function saveState(win?: BrowserWindow) {
    // Update window state only if it was provided
    if (win) {
      updateState(win);
    }

    // Save state
    try {
      options.setState(state);
    } catch (err) {
      // Don't care
    }
  }

  function stateChangeHandler() {
    // Handles both 'resize' and 'move'
    clearTimeout(stateChangeTimer);
    stateChangeTimer = setTimeout(updateState, eventHandlingDelay);
  }

  function closeHandler() {
    updateState();
  }

  function closedHandler() {
    // Unregister listeners and save state
    unmanage();
    saveState();
  }

  function manage(win: BrowserWindow) {
    if (config.maximize && state.isMaximized) {
      win.maximize();
    }
    if (config.fullScreen && state.isFullScreen) {
      win.setFullScreen(true);
    }
    win.on("resize", stateChangeHandler);
    win.on("move", stateChangeHandler);
    win.on("close", closeHandler);
    win.on("closed", closedHandler);
    winRef = win;
  }

  function unmanage() {
    if (winRef) {
      winRef.removeListener("resize", stateChangeHandler);
      winRef.removeListener("move", stateChangeHandler);
      clearTimeout(stateChangeTimer);
      winRef.removeListener("close", closeHandler);
      winRef.removeListener("closed", closedHandler);
      winRef = null;
    }
  }

  // Load previous state
  try {
    state = options.getState() ?? ({} as WindowState);
  } catch (err) {
    // Don't care
  }

  // Check state validity
  validateState();

  // Set state fallback values
  state = Object.assign(
    {
      width: config.defaultWidth || 800,
      height: config.defaultHeight || 600,
    },
    state,
  );

  return {
    get rectangle() {
      return {
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
      };
    },

    /**
     * The saved `x` coordinate of the loaded state. `undefined` if the state has not been saved yet.
     */
    get x() {
      return state.x;
    },

    /**
     * The saved `y` coordinate of the loaded state. `undefined` if the state has not been saved yet.
     */
    get y() {
      return state.y;
    },

    /**
     * The saved `width` of loaded state. `defaultWidth` if the state has not been saved yet.
     */
    get width() {
      return state.width;
    },

    /**
     * The saved `heigth` of loaded state. `defaultHeight` if the state has not been saved yet.
     */
    get height() {
      return state.height;
    },

    get displayBounds() {
      return state.displayBounds;
    },

    /**
     * `true` if the window state was saved while the window was maximized. `undefined` if the state has not been saved yet.
     */
    get isMaximized() {
      return state.isMaximized;
    },

    /**
     * `true` if the window state was saved while the window was in full screen mode. `undefined` if the state has not been saved yet.
     */
    get isFullScreen() {
      return state.isFullScreen;
    },

    /**
     * Saves the current state of the given `BrowserWindow`. This exists mostly for legacy purposes, and in most cases it's better to just use `manage`.
     */
    saveState,

    /**
     * Removes all listeners of the managed `BrowserWindow` in case it does not need to be managed anymore.
     */
    unmanage,

    /**
     * Register listeners on the given `BrowserWindow` for events that are related to size or position changes (`resize`, `move`). It will also restore the window's maximized or full screen state. When the window is closed we automatically remove the listeners and save the state.
     */
    manage,

    resetStateToDefault,
  };
};
