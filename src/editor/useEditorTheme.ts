import { MutableRefObject, useEffect } from "react";
import { Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { AppearanceState } from "../ui/appearance";
import { useLayout } from "../ui";
import { primerDark, primerLight } from "./primerTheme";

export const themeConf = new Compartment();

export const initialThemeSetup = themeConf.of([]);

export const useEditorTheme = (
  editor: MutableRefObject<EditorView | undefined>
) => {
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
