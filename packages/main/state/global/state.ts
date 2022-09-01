import Store from "electron-store";
import { AppearanceState } from "../../../shared/appearance-state";
import { defaultActiveLanguages } from "../../../shared/languages";
import { schema } from "./schema";
import type { State } from "./types";

const defaults: State = {
  windowsState: {
    home: {},
    settings: {},
  },
  appearance: AppearanceState.SYSTEM,
  activeLanguages: defaultActiveLanguages,
};

export const state = new Store<State>({ schema, name: "state", defaults });
