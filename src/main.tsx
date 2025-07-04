import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "schilling-widgets-system/dist/schilling-widgets.css";
import App from "./App.tsx";
import "./index.css";

// Additional fallback styles
const globalStyles = `
  .schilling-button {
    background-color: hsl(222.2 47.4% 11.2%);
    color: hsl(210 40% 98%);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
  }
  .schilling-card {
    background-color: hsl(0 0% 100%);
    border: 1px solid hsl(214.3 31.8% 91.4%);
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

// Inject styles
const styleElement = document.createElement("style");
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
