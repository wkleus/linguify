import TranslatorLayout from "../layout/TranslatorLayout";
import TranslatorHeader from "../layout/TranslatorHeader";
import TranslatorBody from "../layout/TranslatorBody";
import ErrorBox from "../layout/ErrorBox";
import LanguageSelector from "../components/LanguageSelector";
import LanguageList from "../components/LanguageList";
import CopyNotification from "../components/CopyNotification";
import AIStudioModal from "../components/AIStudioModal";
import useTranslator from "../hooks/useTranslator";
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";
import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TranslatorPage() {
  const [showAIStudio, setShowAIStudio] = useState(false);
  const location = useLocation();

  const {
    sourceText,
    translatedText,
    isTranslating,
    error,
    copied,
    setSourceText,
    setTranslatedText,
    translate,
    setCurrentLangs,
  } = useTranslator();

  const {
    watchLanguageList,
    activeLanguage,
    chosenFirstLanguage,
    chosenSecondLanguage,
    isClosing,
    handleLanguageSelect,
    handleChooseLanguage,
    switchLanguages,
    handleCloseLanguageList,
    setChosenFirstLanguage,
    setChosenSecondLanguage,
  } = useLanguageSwitcher();

  // Restore from History
  useEffect(() => {
    const restoreData = location.state?.restore;
    if (!restoreData) return;

    setSourceText(restoreData.sourceText || "");
    setTranslatedText(restoreData.targetText || "");
    setChosenFirstLanguage(restoreData.sourceLang);
    setChosenSecondLanguage(restoreData.targetLang);
  }, [
    location.state,
    setSourceText,
    setTranslatedText,
    setChosenFirstLanguage,
    setChosenSecondLanguage,
  ]);

  // Close language list on outside click -> ref wraps both selector labels and list itself,  // so clicking either label (to open
  // the same or a different list) never counts as "outside"
  const languagePickerRef = useRef(null);

  useEffect(() => {
    if (!watchLanguageList) return;

    const handleClickOutside = (e) => {
      if (
        languagePickerRef.current &&
        !languagePickerRef.current.contains(e.target)
      ) {
        handleCloseLanguageList();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [watchLanguageList, handleCloseLanguageList]);

  return (
    <TranslatorLayout>
      <TranslatorHeader />

      <div className="relative w-full" ref={languagePickerRef}>
        <LanguageSelector
          chosenFirstLanguage={chosenFirstLanguage}
          chosenSecondLanguage={chosenSecondLanguage}
          onSelectLanguage={handleLanguageSelect}
          onSwitchLanguages={() => {
            switchLanguages(
              sourceText,
              translatedText,
              setSourceText,
              setTranslatedText,
            );
            // Sync currentLangs so live translation doesn't fire with stale (pre-swap)
            // language pair (Values here are pre-swap, so new pair is their reverse)
            setCurrentLangs({
              from: chosenSecondLanguage,
              to: chosenFirstLanguage,
            });
          }}
        />
        <LanguageList
          visible={watchLanguageList}
          activeLanguage={activeLanguage}
          chosenFirstLanguage={chosenFirstLanguage}
          chosenSecondLanguage={chosenSecondLanguage}
          onChooseLanguage={handleChooseLanguage}
          isClosing={isClosing}
          onClose={handleCloseLanguageList}
        />
      </div>

      <TranslatorBody
        sourceText={sourceText}
        translatedText={translatedText}
        setSourceText={setSourceText}
        translate={translate}
        isTranslating={isTranslating}
        chosenFirstLanguage={chosenFirstLanguage}
        chosenSecondLanguage={chosenSecondLanguage}
        onImprove={() => setShowAIStudio(true)}
        isImproving={false}
      />

      <CopyNotification visible={copied} />
      <ErrorBox error={error} />

      {/* AI Studio modal – opens when the improve button is clicked */}
      <AnimatePresence>
        {showAIStudio && (
          <AIStudioModal
            isOpen={showAIStudio}
            originalText={sourceText}
            currentTranslation={translatedText}
            setCurrentTranslation={(newText) => {
              setTranslatedText(newText);
              setShowAIStudio(false);
            }}
            sourceLanguage={chosenFirstLanguage}
            targetLanguage={chosenSecondLanguage}
            onClose={() => setShowAIStudio(false)}
          />
        )}
      </AnimatePresence>
    </TranslatorLayout>
  );
}
