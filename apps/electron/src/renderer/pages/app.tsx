import React, { FC } from "react";
import ReactDOM from "react-dom";
import { ElectronLayout } from "../components/ElectronLayout";
import { MacTitleBar } from "../components/MacTitleBar";
import { CodeMirror } from "../components/CodeMirror";

const App: FC = () => {
  return (
    <ElectronLayout>
      <MacTitleBar title="CodeWaffle" platform={window.api.platform} onTitleBarClick={window.api.onTitleBarClick} />
      <CodeMirror />
    </ElectronLayout>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
