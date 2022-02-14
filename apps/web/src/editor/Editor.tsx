import { useEffect, useRef } from "react";
import { getEditorChanges } from "../store";
import { StyledEditor } from "./Editor.style";
import { initialThemeSetup, useCodeMirrorTheme } from "./theme/useCodeMirrorTheme";
import { useCodeMirror } from "./useCodeMirror";
import { initialLanguageSetup } from "./setup/language";
import { basics } from "./setup/basics";
import { statusbar } from "./statusbar";
import { initialContent } from "./setup/initialContent";
import { notification } from "./notification";
import { showWhitespace } from "./extensions/whitespace";

export const Editor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCodeMirror(ref, {
    doc: initialContent,
    extensions: [
      //
      basics,
      initialThemeSetup,
      initialLanguageSetup,
      notification,
      statusbar,
      showWhitespace.instance(),
    ],
  });
  useCodeMirrorTheme(editor);

  useEffect(() => {
    const sub = getEditorChanges().subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledEditor ref={ref} />;
};
