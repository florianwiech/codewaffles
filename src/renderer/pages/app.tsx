import React, { FC } from "react";
import ReactDOM from "react-dom";
import { isElectron } from "../../isElectron";
import { ElectronLayout } from "../components/theme/electron/ElectronLayout";
import { BrowserLayout } from "../components/theme/web/BrowserLayout";
import { MacTitleBar } from "../components/MacTitleBar";
import { Spotlight } from "../components/Spotlight";
import { CodeMirror } from "../components/CodeMirror";

const App: FC = () => {
  const Layout = isElectron() ? ElectronLayout : BrowserLayout;

  return (
    <Layout>
      <MacTitleBar title="CodeWaffle" platform={window.main?.platform} onTitleBarClick={window.main?.onTitleBarClick} />
      <Spotlight />
      <CodeMirror />
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
