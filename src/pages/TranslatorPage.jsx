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
import { useState } from "react";

export default function TranslatorPage() {
  const [showAIStudio, setShowAIStudio] = useState(false);

  const {
    sourceText,
    translatedText,
    isTranslating,
    error,
    copied,
    setSourceText,
    setTranslatedText,
    translate,
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
  } = useLanguageSwitcher();

  return (
    <TranslatorLayout>
      <TranslatorHeader />

      <div className="relative w-full">
        <LanguageSelector
          chosenFirstLanguage={chosenFirstLanguage}
          chosenSecondLanguage={chosenSecondLanguage}
          onSelectLanguage={handleLanguageSelect}
          onSwitchLanguages={() =>
            switchLanguages(
              sourceText,
              translatedText,
              setSourceText,
              setTranslatedText,
            )
          }
        />
        <LanguageList
          visible={watchLanguageList}
          activeLanguage={activeLanguage}
          chosenFirstLanguage={chosenFirstLanguage}
          chosenSecondLanguage={chosenSecondLanguage}
          onChooseLanguage={handleChooseLanguage}
          isClosing={isClosing}
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
