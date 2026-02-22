import { createContext, useContext, useState } from "react";

// 1. Create context
const SettingsContext = createContext(null);

// 2. Provider component – wraps the entire app
export function SettingsProvider({ children }) {
  // Lazy initializer: read from localStorage only ONCE on mount,
  // after that the state lives in React (not localStorage)
  const [autoClearInstant, setAutoClearInstant] = useState(
    () => localStorage.getItem("autoClearInstant") === "true",
  );
  const [autoClearDelay, setAutoClearDelay] = useState(
    () => localStorage.getItem("autoClearDelay") === "true",
  );
  const [autoCopy, setAutoCopy] = useState(
    () => localStorage.getItem("autoCopy") === "true",
  );

  // Persists all settings to localStorage at once
  const saveSettings = () => {
    localStorage.setItem("autoClearInstant", autoClearInstant);
    localStorage.setItem("autoClearDelay", autoClearDelay);
    localStorage.setItem("autoCopy", autoCopy);
  };

  // Setters with mutual exclusion for autoClear options
  const handleSetAutoClearInstant = (value) => {
    setAutoClearInstant(value);
    if (value) setAutoClearDelay(false); // prevents that both are active simultaneously
  };

  const handleSetAutoClearDelay = (value) => {
    setAutoClearDelay(value);
    if (value) setAutoClearInstant(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        autoClearInstant,
        autoClearDelay,
        autoCopy,
        setAutoClearInstant: handleSetAutoClearInstant,
        setAutoClearDelay: handleSetAutoClearDelay,
        setAutoCopy,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// 3. Custom hook for clean access
// Throws an error if the Provider was forgotten –
// a helpful dev error instead of a silent undefined
export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }
  return context;
}
