import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import { AppearanceState } from "../components/theme";
import { ElectronLayout } from "../components/theme/electron/ElectronLayout";
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

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Settings />);
