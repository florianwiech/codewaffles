import { ipcMain } from "electron";
import { IpcEvents } from "../../shared/ipc-events";
import { state } from "../state/global/state";
import { defaultActiveLanguages, supportedLanguages } from "../../shared/languages";
import { browserWindows } from "../windows/main-window";

export function setupLanguageHandler() {
  ipcMain.handle(IpcEvents.GET_LANGUAGES, () => {
    return state.get("activeLanguages", defaultActiveLanguages);
  });

  ipcMain.handle(IpcEvents.TOGGLE_LANGUAGE, (event, lang: string) => {
    if (!supportedLanguages.includes(lang)) {
      throw new Error("language does not exist");
    }

    let activeLanguages = state.get("activeLanguages");

    if (activeLanguages.includes(lang)) {
      activeLanguages = activeLanguages.filter((item) => item !== lang);
    } else {
      activeLanguages.push(lang);
    }

    activeLanguages = activeLanguages.sort();

    state.set("activeLanguages", activeLanguages);

    browserWindows.forEach((win) => {
      win?.webContents.send(IpcEvents.CHANGED_LANGUAGE_SET, activeLanguages);
    });

    return activeLanguages;
  });
}
