import { useContext } from "react";
import { SettingsContext } from "./settingsContextInstance";

// Custom hook for clean access
// Throws an error if the Provider was forgotten
export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }
  return context;
}
