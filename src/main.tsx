import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename="/nannies-app/">
      <App />
    </BrowserRouter>
  </StrictMode>
);
