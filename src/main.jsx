import { BrowserRouter } from "react-router-dom";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/nannies-app/">
      <App />
    </BrowserRouter>
  </StrictMode>
);
