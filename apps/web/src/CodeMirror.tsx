import { FC, useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import {
  AppearanceSwitch,
  basics,
  CursorInformation,
  initialThemeSetup,
  LanguageSwitch,
  notification,
  statusbar,
  StyledEditor,
  useCodeMirror,
  useCodeMirrorTheme,
} from "@codewaffle/components";
import { editor$, getEditorChanges, notification$ } from "./store";
import { useObservable } from "./shared/hooks/useObservable";
import { appearance$, changeAppearance, theme$ } from "./appearance";

const StatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
  const appearance = useObservable(appearance$)!;

  return (
    <>
      <div className="spacer" />
      <CursorInformation state={view.state} />
      <AppearanceSwitch appearance={appearance} onAppearanceChange={changeAppearance} />
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
      extensions: [basics, initialThemeSetup, statusbar(StatusbarPanel), notification(notification$)],
    },
  });

  useCodeMirrorTheme({ editor, theme });

  useEffect(() => {
    const sub = getEditorChanges().subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledEditor ref={ref} />;
};
