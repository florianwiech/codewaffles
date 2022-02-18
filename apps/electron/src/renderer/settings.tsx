import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppearanceState } from "@codewaffle/components";
import { ElectronLayout } from "./components/ElectronLayout";
import { MacTitleBar } from "./components/MacTitleBar";

ReactDOM.render(
  <ElectronLayout>
    <MacTitleBar
      title="CodeWaffle"
      platform={window.settings.platform}
      onTitleBarClick={window.settings.onTitleBarClick}
    />

    <h2>⚙️ Settings</h2>

    <button onClick={() => window.settings.changeAppearance(AppearanceState.SYSTEM)}>System</button>
    <button onClick={() => window.settings.changeAppearance(AppearanceState.DARK)}>Dark</button>
    <button onClick={() => window.settings.changeAppearance(AppearanceState.LIGHT)}>Light</button>
  </ElectronLayout>,
  document.getElementById("root"),
);
