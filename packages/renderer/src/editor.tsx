import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import { ElectronLayout } from "./components/theme/electron/ElectronLayout";
import { MacTitleBar } from "./components/MacTitleBar";
import { Spotlight } from "./components/Spotlight";
import { CodeMirror } from "./components/CodeMirror";
import "./assets/index.css";
import { Header } from "./components/Header";

window?.main?.onAutoUpdate((_, message) => {
  // eslint-disable-next-line no-console
  console.log(message);
});

const App: FC = () => {
  return (
    <>
      <Header />
      {/*<MacTitleBar*/}
      {/*  title="CodeWaffle"*/}
      {/*  platform={window?.main?.platform}*/}
      {/*  onTitleBarClick={window?.main?.onTitleBarClick}*/}
      {/*/>*/}
      {/*<Spotlight />*/}
      {/*<CodeMirror />*/}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
