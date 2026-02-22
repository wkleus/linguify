import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./tailwind.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext.jsx"; // NEW

// Dark Mode BEFORE React renders
const savedDark = localStorage.getItem("darkMode") === "true";
if (savedDark) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // SettingsProvider wraps the entire app –
  // now ALL components can access the settings
  <BrowserRouter>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </BrowserRouter>,
);
