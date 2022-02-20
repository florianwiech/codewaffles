import { FC, useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import {
  basics,
  CursorInformation,
  initialLanguageSetup,
  initialThemeSetup,
  LanguageSwitch,
  statusbar,
  StyledEditor,
  useCodeMirror,
  useCodeMirrorTheme,
} from "@codewaffle/components";
import { getEditorChanges } from "@codewaffle/domain";
import { useObservable } from "@codewaffle/utils";
import { theme$ } from "../appearance";
import { command$, editor$, notification$, view$ } from "../store";

const StatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
  return (
    <>
      <div className="spacer" />
      <CursorInformation state={view.state} />
      <LanguageSwitch view={view} />
    </>
  );
};

export const CodeMirror: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useObservable(theme$);

  const editor = useCodeMirror({
    ref,
    editor$,
    options: {
      extensions: [
        //
        basics,
        initialThemeSetup,
        initialLanguageSetup,
        statusbar(StatusbarPanel),
      ],
    },
  });

  useCodeMirrorTheme({ editor, theme });

  useEffect(() => {
    const sub = getEditorChanges({ notification$, command$, view$ }).subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledEditor ref={ref} />;
};
