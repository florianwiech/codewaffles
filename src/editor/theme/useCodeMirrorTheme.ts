import { useEffect } from "react";
import { Compartment } from "@codemirror/state";
import { AppearanceState, theme$ } from "../../ui/appearance";
import { CodeMirrorEditor } from "../editor.types";
import { useObservable } from "../../shared/hooks/useObservable";
import { primerDark, primerLight } from "./primerTheme";

export const themeConf = new Compartment();

export const initialThemeSetup = themeConf.of([]);

export const useCodeMirrorTheme = (editor: CodeMirrorEditor) => {
  const theme = useObservable(theme$);

  useEffect(() => {
    if (!editor.current) return;

    editor.current.dispatch({
      effects: themeConf.reconfigure(
        theme === AppearanceState.DARK ? primerDark : primerLight,
      ),
    });
  }, [editor, theme]);
};
