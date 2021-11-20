import { useRef } from "react";
import { StyledEditor } from "./Editor.style";
import { useEditorTheme } from "./useEditorTheme";
import { useEditor } from "./useEditor";

export const Editor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useEditor(ref);
  useEditorTheme(editor);

  return <StyledEditor ref={ref} />;
};
