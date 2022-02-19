import { FC, useRef } from "react";
import { BehaviorSubject } from "rxjs";
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
import { useObservable } from "@codewaffle/utils";
import { theme$ } from "../appearance";

export const editor$ = new BehaviorSubject<EditorView | null>(null);

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
      extensions: [basics, initialThemeSetup, initialLanguageSetup, statusbar(StatusbarPanel)],
    },
  });

  useCodeMirrorTheme({ editor, theme });

  return <StyledEditor ref={ref} />;
};
