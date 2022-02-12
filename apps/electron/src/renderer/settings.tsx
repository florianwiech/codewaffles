import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppearanceState } from "@codewaffle/components";
import { MacOsTitleBar } from "./components/header";
import "./styles.css";

ReactDOM.render(
  <>
    <MacOsTitleBar
      title="CodeWaffle"
      platform={window.settings.platform}
      onTitleBarClick={window.settings.onTitleBarClick}
    />

    <h2>⚙️ Settings</h2>

    <button onClick={() => window.settings.changeAppearance(AppearanceState.SYSTEM)}>System</button>
    <button onClick={() => window.settings.changeAppearance(AppearanceState.DARK)}>Dark</button>
    <button onClick={() => window.settings.changeAppearance(AppearanceState.LIGHT)}>Light</button>
  </>,
  document.getElementById("root"),
);
