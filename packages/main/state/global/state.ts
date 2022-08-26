import Store from "electron-store";
import { schema } from "./schema";
import type { State } from "./types";

const defaults: State = {
  windowsState: {
    home: {},
    settings: {},
  },
};

export const state = new Store<State>({ schema, name: "state", defaults });
