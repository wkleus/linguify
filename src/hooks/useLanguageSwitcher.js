import { useState } from "react";
import { useSettingsContext } from "../context/useSettingsContext";

export default function useLanguageSwitcher() {
  const { defaultSourceLanguage, defaultTargetLanguage } = useSettingsContext();

  // Controls visibility of the language dropdown list
  const [watchLanguageList, setWatchLanguageList] = useState(false);

  // Tracks which selector ("from" or "to") is currently active
  const [activeLanguage, setActiveLanguage] = useState(null);

  // Selected languages for translation - initialized from the user's
  // configured default pair (Settings page), falls back to German/English
  const [chosenFirstLanguage, setChosenFirstLanguage] = useState(
    defaultSourceLanguage,
  );
  const [chosenSecondLanguage, setChosenSecondLanguage] = useState(
    defaultTargetLanguage,
  );

  // Controls closing animation of the language list
  const [isClosing, setIsClosing] = useState(false);

  // Opens the language list for the selected type
  const handleLanguageSelect = (type) => {
    setActiveLanguage(type);
    setWatchLanguageList(true);
  };

  // Handles choosing a language from the list
  const handleChooseLanguage = (language) => {
    if (activeLanguage === "from") {
      setChosenFirstLanguage(language.name);
    } else {
      setChosenSecondLanguage(language.name);
    }

    // Trigger closing animation
    setIsClosing(true);
    setTimeout(() => {
      setWatchLanguageList(false);
      setIsClosing(false);
    }, 250);
  };

  // Swaps the selected languages and optionally swaps text content
  const switchLanguages = (
    sourceText,
    translatedText,
    setSourceText,
    setTranslatedText,
  ) => {
    const temp = chosenFirstLanguage;
    setChosenFirstLanguage(chosenSecondLanguage);
    setChosenSecondLanguage(temp);

    // Swap text fields if translation exists
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  return {
    watchLanguageList,
    activeLanguage,
    chosenFirstLanguage,
    chosenSecondLanguage,
    isClosing,
    handleLanguageSelect,
    handleChooseLanguage,
    switchLanguages,
  };
}
