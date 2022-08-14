import { FC, useEffect, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import { EditorView } from "@codemirror/view";
import { EditorStateConfig } from "@codemirror/state";
import { getEditorChanges } from "../domain";
import { command$, editor$, notification$, view$ } from "../store";
import { useBehaviorSubject } from "../shared/hooks/useBehaviorSubject";
import { isElectron } from "../../../shared/isElectron";
import { electronTheme$ } from "./theme/electron/appearance";
import {
  AppearanceSwitch,
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
import { changeAppearance, webAppearance$, webTheme$ } from "./theme/web/appearance";

const macEditorHeight = css`
  height: calc(100% - ${MAC_OS_TITLE_BAR_HEIGHT});
`;

const StyledElectronEditor = styled(StyledEditor)`
  ${window.main?.platform === "darwin" ? macEditorHeight : ""}
`;

const WebStatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
  const appearance = useBehaviorSubject(webAppearance$)!;

  return (
    <>
      <div className="spacer" />
      <CursorInformation state={view.state} />
      <AppearanceSwitch appearance={appearance} onAppearanceChange={changeAppearance} />
      <LanguageSwitch view={view} />
    </>
  );
};

const NativeStatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
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
  const theme = useBehaviorSubject(isElectron() ? electronTheme$ : webTheme$);

  const options = useMemo<EditorStateConfig>(
    () => ({
      extensions: [
        //
        basics,
        initialThemeSetup,
        initialLanguageSetup,
        statusbar(isElectron() ? NativeStatusbarPanel : WebStatusbarPanel),
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
