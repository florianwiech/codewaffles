import React, { FC } from "react";
import ReactDOM from "react-dom";
import { tap } from "rxjs/operators";
import { useObservable } from "@codewaffle/utils";
import { ElectronLayout } from "../components/ElectronLayout";
import { MacTitleBar } from "../components/MacTitleBar";
import { Spotlight } from "../components/Spotlight";
import { CodeMirror } from "../components/CodeMirror";
import { notification$ } from "../store";

const showNotifications = () => notification$.pipe(tap(window.main?.openNotification));

const App: FC = () => {
  useObservable(showNotifications());

  return (
    <ElectronLayout>
      <MacTitleBar title="CodeWaffle" platform={window.main?.platform} onTitleBarClick={window.main?.onTitleBarClick} />
      <Spotlight />
      <CodeMirror />
    </ElectronLayout>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
