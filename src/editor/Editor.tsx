import { useEffect, useRef } from "react";
import { transform$ } from "../streams";
import { StyledEditor } from "./Editor.style";
import {
  initialThemeSetup,
  useCodeMirrorTheme,
} from "./theme/useCodeMirrorTheme";
import { useCodeMirror } from "./useCodeMirror";
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

  useEffect(() => {
    const sub = transform$.subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledEditor ref={ref} />;
};
