import React, { FC } from "react";
import * as ReactDOM from "react-dom";
import { AppearanceState } from "../components/theme";
import { ElectronLayout } from "../components/ElectronLayout";
import { MacTitleBar } from "../components/MacTitleBar";

const Settings: FC = () => {
  return (
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
    </ElectronLayout>
  );
};

ReactDOM.render(<Settings />, document.getElementById("root"));
