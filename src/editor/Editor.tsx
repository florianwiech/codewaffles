import { useEffect, useRef } from "react";
import { editorChanges$ } from "../streams";
import { StyledEditor } from "./Editor.style";
import {
  initialThemeSetup,
  useCodeMirrorTheme,
} from "./theme/useCodeMirrorTheme";
import { useCodeMirror } from "./useCodeMirror";
import { initialLanguageSetup } from "./setup/language";
import { basics } from "./setup/basics";
import { statusbar } from "./statusbar";
import { initialContent } from "./setup/initialContent";

export const Editor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCodeMirror(ref, {
    doc: initialContent,
    extensions: [basics, initialThemeSetup, initialLanguageSetup, statusbar],
  });
  useCodeMirrorTheme(editor);

  useEffect(() => {
    const sub = editorChanges$.subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledEditor ref={ref} />;
};
