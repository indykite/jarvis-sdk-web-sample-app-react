import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { IKUIInit } from "@indykiteone/jarvis-sdk-web";

IKUIInit({
  baseUri: process.env.REACT_APP_BASE_URI,
  applicationId: process.env.REACT_APP_APPLICATION_ID,
  tenantId: process.env.REACT_APP_TENANT_ID,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
