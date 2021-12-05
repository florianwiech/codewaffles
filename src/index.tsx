import React from "react";
import ReactDOM from "react-dom";
import { create as createRxSpy } from "rxjs-spy";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Layout } from "./ui";

if (process.env.NODE_ENV !== "production") {
  createRxSpy();
}

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
