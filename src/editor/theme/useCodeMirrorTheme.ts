import { useEffect } from "react";
import { Compartment } from "@codemirror/state";
import { AppearanceState } from "../../ui/appearance";
import { useLayout } from "../../ui";
import { CodeMirrorEditor } from "../editor.types";
import { primerDark, primerLight } from "./primerTheme";

export const themeConf = new Compartment();

export const initialThemeSetup = themeConf.of([]);

export const useCodeMirrorTheme = (editor: CodeMirrorEditor) => {
  const theme = useLayout();

  useEffect(() => {
    if (!editor.current) return;

    editor.current.dispatch({
      effects: themeConf.reconfigure(
        theme === AppearanceState.DARK ? primerDark : primerLight
      ),
    });
  }, [editor, theme]);
};
