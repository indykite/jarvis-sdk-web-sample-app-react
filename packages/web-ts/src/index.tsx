import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import InitApp from "./InitApp";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <InitApp />
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
