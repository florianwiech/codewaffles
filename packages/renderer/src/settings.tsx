import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { ElectronLayout } from "./components/theme/electron/ElectronLayout";
import { SettingsHeader } from "./components/settings/SettingsHeader";
import { SettingsGeneral } from "./components/settings/SettingsGeneral";
import { SettingsLanguages } from "./components/settings/SettingsLanguages";

const Settings: FC = () => {
  return (
    <MemoryRouter initialEntries={["/general"]}>
      <ElectronLayout>
        <SettingsHeader onTitleBarClick={window.settings?.onTitleBarClick} />

        <Routes>
          <Route path="general" element={<SettingsGeneral />} />
          <Route path="languages" element={<SettingsLanguages />} />
          <Route path="*" element={<Navigate to="general" replace />} />
        </Routes>
      </ElectronLayout>
    </MemoryRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Settings />);
