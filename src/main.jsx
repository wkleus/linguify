import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./tailwind.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { MotionConfig } from "framer-motion";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // ErrorBoundary wraps everything - catches render crashes anywhere in the
  // tree below it and shows fallback instead of blank white screen
  <ErrorBoundary>
    {/* MotionConfig reducedMotion="user": respects the OS-level prefers-reduced-motion setting app-wide, without touching every individual motion.* component */}
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        {/* SettingsProvider wraps the entire app – now ALL components can access the settings  */}
        <SettingsProvider>
          {/* AuthProvider for global user state and Supabase session management */}
          <AuthProvider>
            <App />
          </AuthProvider>
        </SettingsProvider>
      </BrowserRouter>
    </MotionConfig>
  </ErrorBoundary>,
);
