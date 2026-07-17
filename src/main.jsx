import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./tailwind.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Dark Mode BEFORE React renders
const savedDark = localStorage.getItem("darkMode") === "true";
if (savedDark) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // ErrorBoundary wraps everything - catches render crashes anywhere in the
  // tree below it and shows fallback instead of blank white screen
  // SettingsProvider wraps the entire app –
  // now ALL components can access the settings
  <ErrorBoundary>
    <BrowserRouter>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);
