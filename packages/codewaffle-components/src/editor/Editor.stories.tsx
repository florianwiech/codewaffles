import { createContext, FC, useContext, useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BehaviorSubject } from "rxjs";
import { EditorView } from "@codemirror/view";
import { useDarkMode } from "storybook-dark-mode";
import { action } from "@storybook/addon-actions";
import { AppearanceState, Layout } from "../theme";
import { StyledEditor } from "./Editor.style";
import { useCodeMirror } from "./useCodeMirror";
import { initialContent } from "./setup/initialContent";
import { basics } from "./setup/basics";
import { initialThemeSetup, useCodeMirrorTheme } from "./theme/useCodeMirrorTheme";
import { initialLanguageSetup } from "./setup/language";
import { CursorInformation } from "./statusbar/CursorInformation";
import { statusbar } from "./statusbar/statusbar";
import { AppearanceSwitch } from "./statusbar/AppearanceSwitch";
import { LanguageSwitch } from "./statusbar/LanguageSwitch";

const editor$ = new BehaviorSubject<EditorView | null>(null);
const ThemeContext = createContext(AppearanceState.DARK);

const StatusbarPanel: FC<{ view: EditorView }> = ({ view }) => {
  return (
    <>
      <div className="spacer" />
      <CursorInformation state={view.state} />
      <AppearanceSwitch appearance={AppearanceState.SYSTEM} onAppearanceChange={action("onAppearanceChange")} />
      <LanguageSwitch view={view} />
    </>
  );
};

const CodeMirror: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);

  const editor = useCodeMirror({
    ref,
    editor$,
    options: {
      doc: initialContent,
      extensions: [basics, initialThemeSetup, initialLanguageSetup, statusbar(StatusbarPanel)],
    },
  });

  useCodeMirrorTheme({ editor, theme });

  return <StyledEditor ref={ref} />;
};

export default {
  title: "Components/Editor",
  component: CodeMirror,
  args: {},
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on.*" },
  },
  decorators: [
    (Story) => {
      const theme = useDarkMode() ? AppearanceState.DARK : AppearanceState.LIGHT;
      return (
        <Layout theme={theme}>
          <ThemeContext.Provider value={theme}>
            <Story />
          </ThemeContext.Provider>
        </Layout>
      );
    },
  ],
} as ComponentMeta<typeof CodeMirror>;

export const Editor: ComponentStory<typeof CodeMirror> = (args) => <CodeMirror {...args} />;
