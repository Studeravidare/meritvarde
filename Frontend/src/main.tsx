import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("ts-app-root");

if (container) {
  console.log("Test");
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
