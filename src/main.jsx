/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";
import Context from "./components/Admin/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Context>
        <App />
      </Context>
    </Router>
  </StrictMode>,
);
