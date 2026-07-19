import { useEffect, useState } from "react";
import { SettingsContext } from "./settingsContextInstance";
import languagesList from "../data/languagesList";

const isKnownLanguage = (name) =>
  languagesList.languages.some((l) => l.name === name);

// Provider component – wraps the entire app
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

  // Text-to-speech rate level: "slow" | "normal" | "fast"
  // Actual playback rate is computed per-language (-> getSpeechRate.js)
  const [speechRate, setSpeechRate] = useState(() => {
    const stored = localStorage.getItem("speechRate");
    return ["slow", "normal", "fast"].includes(stored) ? stored : "normal";
  });

  // Default language pair, applied when Translator page first loads
  const [defaultSourceLanguage, setDefaultSourceLanguage] = useState(() => {
    const stored = localStorage.getItem("defaultSourceLanguage");
    return isKnownLanguage(stored) ? stored : "German";
  });
  const [defaultTargetLanguage, setDefaultTargetLanguage] = useState(() => {
    const stored = localStorage.getItem("defaultTargetLanguage");
    return isKnownLanguage(stored) ? stored : "English";
  });

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

  useEffect(() => {
    localStorage.setItem("speechRate", speechRate);
  }, [speechRate]);

  useEffect(() => {
    localStorage.setItem("defaultSourceLanguage", defaultSourceLanguage);
  }, [defaultSourceLanguage]);

  useEffect(() => {
    localStorage.setItem("defaultTargetLanguage", defaultTargetLanguage);
  }, [defaultTargetLanguage]);

  // Setters with mutual exclusion for autoClear options
  const handleSetAutoClearInstant = (value) => {
    setAutoClearInstant(value);
    if (value) setAutoClearDelay(false); // prevents that both are active simultaneously
  };

  const handleSetAutoClearDelay = (value) => {
    setAutoClearDelay(value);
    if (value) setAutoClearInstant(false);
  };

  // Prevents source and target being set to the same language
  const handleSetDefaultSourceLanguage = (name) => {
    if (name === defaultTargetLanguage) {
      setDefaultTargetLanguage(defaultSourceLanguage);
    }
    setDefaultSourceLanguage(name);
  };

  const handleSetDefaultTargetLanguage = (name) => {
    if (name === defaultSourceLanguage) {
      setDefaultSourceLanguage(defaultTargetLanguage);
    }
    setDefaultTargetLanguage(name);
  };

  return (
    <SettingsContext.Provider
      value={{
        autoClearInstant,
        autoClearDelay,
        autoCopy,
        liveTranslation,
        speechRate,
        defaultSourceLanguage,
        defaultTargetLanguage,
        setAutoClearInstant: handleSetAutoClearInstant,
        setAutoClearDelay: handleSetAutoClearDelay,
        setAutoCopy,
        setLiveTranslation,
        setSpeechRate,
        setDefaultSourceLanguage: handleSetDefaultSourceLanguage,
        setDefaultTargetLanguage: handleSetDefaultTargetLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
