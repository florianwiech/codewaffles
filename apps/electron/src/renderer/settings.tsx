import * as React from "react";
import * as ReactDOM from "react-dom";
import { MacOsTitleBar } from "./components/header";
import "./styles.css";

ReactDOM.render(
  <>
    <MacOsTitleBar title="CodeWaffle" />
    <h2>⚙️ Settings</h2>
  </>,
  document.getElementById("root"),
);
