import styled from "styled-components";
import typography from "@primer/primitives/dist/js/typography/normal";
import { styledStatusbar } from "./styles/statusbar.style";
import { styledSearch } from "./styles/search.style";
import { styledNotification } from "./styles/notification.style";

export const StyledEditor = styled.div`
  .cm-editor {
    height: 100vh;

    .cm-panels {
      ${styledSearch}
      ${styledStatusbar}
      ${styledNotification}
    }

    .cm-scroller {
      height: 100%;
      font-size: ${typography.fontSize[1]};
      font-family: "SFMono Regular", Menlo, Monaco, Consolas, "Liberation Mono",
        "Courier New", monospace;
      line-height: ${typography.lineHeight.default};
    }

    .cm-cursor {
      border-left-width: 2px;
    }
  }
`;
