import { useRef } from "react";
import { StyledEditor } from "./Editor.style";
import {
  initialThemeSetup,
  useCodeMirrorTheme,
} from "./theme/useCodeMirrorTheme";
import { useCodeMirror } from "./setup/useCodeMirror";
import { useEditorTransforms } from "./useEditorTransforms";
import { initialLanguageSetup } from "./setup/language";
import { basics } from "./setup/basics";
import { statusbar } from "./statusbar";

export const Editor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCodeMirror(ref, [
    basics,
    initialThemeSetup,
    initialLanguageSetup,
    statusbar,
  ]);
  useCodeMirrorTheme(editor);
  useEditorTransforms(editor);

  return <StyledEditor ref={ref} />;
};
