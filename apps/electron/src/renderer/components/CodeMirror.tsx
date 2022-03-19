import { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { EditorView } from "@codemirror/view";
import { StateEffect } from "@codemirror/state";
import { getEditorChanges } from "../domain";
import { theme$ } from "../appearance";
import { command$, editor$, notification$, view$ } from "../store";
import { useBehaviorSubject } from "../shared/hooks/useBehaviorSubject";
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
} from "./editor";
import { MAC_OS_TITLE_BAR_HEIGHT } from "./MacTitleBar";

const macEditorHeight = css`
  height: calc(100% - ${MAC_OS_TITLE_BAR_HEIGHT});
`;

const StyledElectronEditor = styled(StyledEditor)`
  ${window.main?.platform === "darwin" ? macEditorHeight : ""}
`;

const StatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
  return (
    <>
      <div className="spacer" />
      <CursorInformation state={view.state} />
      <LanguageSwitch view={view} />
    </>
  );
};

const options = {
  extensions: [
    //
    basics,
    initialThemeSetup,
    initialLanguageSetup,
  ],
};

export const CodeMirror: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useBehaviorSubject(theme$);

  const editor = useCodeMirror({
    ref,
    editor$,
    options,
  });

  useCodeMirrorTheme({ editor, theme });

  useEffect(() => {
    editor.current.dispatch({
      effects: StateEffect.appendConfig.of(statusbar(StatusbarPanel)),
    });
  }, [editor]);

  useEffect(() => {
    const sub = getEditorChanges({ notification$, command$, view$ }).subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledElectronEditor ref={ref} />;
};
