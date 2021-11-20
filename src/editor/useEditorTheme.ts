import { useEffect } from "react";
import { Compartment } from "@codemirror/state";
import { AppearanceState } from "../ui/appearance";
import { useLayout } from "../ui";
import { primerDark, primerLight } from "./primerTheme";
import { CodeMirrorEditor } from "./editor.types";

export const themeConf = new Compartment();

export const initialThemeSetup = themeConf.of([]);

export const useEditorTheme = (editor: CodeMirrorEditor) => {
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
