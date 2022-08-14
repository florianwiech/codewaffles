import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import { isElectron } from "../../shared/isElectron";
import { ElectronLayout } from "./components/theme/electron/ElectronLayout";
import { BrowserLayout } from "./components/theme/web/BrowserLayout";
import { MacTitleBar } from "./components/MacTitleBar";
import { Spotlight } from "./components/Spotlight";
import { CodeMirror } from "./components/CodeMirror";

if (isElectron()) {
  window?.main?.onAutoUpdate((_, message) => {
    // eslint-disable-next-line no-console
    console.log(message);
  });
}

const App: FC = () => {
  const Layout = isElectron() ? ElectronLayout : BrowserLayout;

  return (
    <Layout>
      <MacTitleBar
        title="CodeWaffle"
        platform={window?.main?.platform}
        onTitleBarClick={window?.main?.onTitleBarClick}
      />
      <Spotlight />
      <CodeMirror />
    </Layout>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
