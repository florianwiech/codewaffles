import { Compartment } from "@codemirror/state";
import { languages as languageData } from "@codemirror/language-data";

export const languageConf = new Compartment();

export const initialLanguageSetup = languageConf.of([]);

export const languageExtensions = [
  {
    name: "Plain text",
    load() {
      return Promise.resolve([]);
    },
  },
  ...languageData,
];
