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
import styled, { css } from "styled-components";
import { theme$ } from "../appearance";
import { useObservable } from "./useObservable";
import { MAC_OS_TITLE_BAR_HEIGHT } from "./MacTitleBar";

export const editor$ = new BehaviorSubject<EditorView | null>(null);

const macEditorHeight = css`
  height: calc(100vh - ${MAC_OS_TITLE_BAR_HEIGHT});
`;

const StyledElectronEditor = styled(StyledEditor)`
  ${window.api.platform === "darwin" ? macEditorHeight : ""}
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
  const theme = useObservable(theme$);

  const editor = useCodeMirror({
    ref,
    editor$,
    options: {
      extensions: [basics, initialThemeSetup, initialLanguageSetup, statusbar(StatusbarPanel)],
    },
  });

  useCodeMirrorTheme({ editor, theme });

  return <StyledElectronEditor ref={ref} />;
};
