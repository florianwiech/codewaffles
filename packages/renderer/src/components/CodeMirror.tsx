import { FC, useEffect, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import { EditorView } from "@codemirror/view";
import { EditorStateConfig } from "@codemirror/state";
import { getEditorChanges } from "../domain";
import { command$, editor$, notification$, view$ } from "../store";
import { useBehaviorSubject } from "../shared/hooks/useBehaviorSubject";
import { electronTheme$ } from "./theme/electron/appearance";
import {
  basics,
  CursorInformation,
  initialLanguageSetup,
  initialThemeSetup,
  LanguageSwitch,
  notification,
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

export const CodeMirror: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useBehaviorSubject(electronTheme$);

  const options = useMemo<EditorStateConfig>(
    () => ({
      extensions: [
        //
        basics,
        initialThemeSetup,
        initialLanguageSetup,
        statusbar(StatusbarPanel),
        notification(notification$),
      ],
    }),
    [],
  );

  const editor = useCodeMirror({
    ref,
    editor$,
    options,
  });

  useCodeMirrorTheme({ editor, theme });

  useEffect(() => {
    const sub = getEditorChanges({ notification$, command$, view$ }).subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <StyledElectronEditor ref={ref} />;
};
