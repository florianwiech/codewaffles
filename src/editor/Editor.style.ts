import styled from "styled-components";
import typography from "@primer/primitives/dist/ts/typography/normal";

export const StyledEditor = styled.div`
  .cm-editor {
    height: 100vh;

    .cm-scroller {
      height: 100%;
      font-size: ${typography.fontSize[0]};
      font-family: "SFMono Regular", Menlo, Monaco, Consolas, "Liberation Mono",
        "Courier New", monospace;
    }

    .cm-cursor {
      border-left-width: 2px;
    }
  }
`;
