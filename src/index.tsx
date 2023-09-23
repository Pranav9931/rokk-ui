import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./containers/App";
import ReactStateProvider from "./context/stateContent";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactStateProvider>
      <App />
    </ReactStateProvider>
  </React.StrictMode>
);
