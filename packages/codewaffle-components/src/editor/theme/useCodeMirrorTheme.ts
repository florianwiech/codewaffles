import { useEffect } from "react";
import { Compartment } from "@codemirror/state";
import { CodeMirrorEditor } from "../editor.types";
import { AppearanceState } from "../../theme";
import { primerDark, primerLight } from "./primerTheme";

export type useCodeMirrorThemeParams = {
  editor: CodeMirrorEditor;
  theme?: Omit<AppearanceState, "system">;
};

export const themeConf = new Compartment();

export const initialThemeSetup = themeConf.of([]);

export const useCodeMirrorTheme = ({ editor, theme }: useCodeMirrorThemeParams) => {
  useEffect(() => {
    if (!editor.current) return;

    editor.current.dispatch({
      effects: themeConf.reconfigure(theme === AppearanceState.DARK ? primerDark : primerLight),
    });
  }, [editor, theme]);
};
