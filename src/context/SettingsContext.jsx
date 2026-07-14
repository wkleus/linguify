import { createContext, useContext, useEffect, useState } from "react";

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
  const [liveTranslation, setLiveTranslation] = useState(
    () => localStorage.getItem("liveTranslation") === "true",
  );

  // Auto-save: persists to localStorage whenever a setting changes.
  // The empty-array mount run is intentionally skipped via the initializer
  // above – localStorage is only written when the user actually toggles something.
  useEffect(() => {
    localStorage.setItem("autoClearInstant", autoClearInstant);
  }, [autoClearInstant]);

  useEffect(() => {
    localStorage.setItem("autoClearDelay", autoClearDelay);
  }, [autoClearDelay]);

  useEffect(() => {
    localStorage.setItem("autoCopy", autoCopy);
  }, [autoCopy]);

  useEffect(() => {
    localStorage.setItem("liveTranslation", liveTranslation);
  }, [liveTranslation]);

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
        liveTranslation,
        setAutoClearInstant: handleSetAutoClearInstant,
        setAutoClearDelay: handleSetAutoClearDelay,
        setAutoCopy,
        setLiveTranslation,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// 3. Custom hook for clean access
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
