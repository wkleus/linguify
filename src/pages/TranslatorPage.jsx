import TranslatorLayout from "../layout/TranslatorLayout";
import TranslatorHeader from "../layout/TranslatorHeader";
import TranslatorBody from "../layout/TranslatorBody";
import ErrorBox from "../layout/ErrorBox";
import LanguageSelector from "../components/LanguageSelector";
import LanguageList from "../components/LanguageList";
import CopyNotification from "../components/CopyNotification";
import useTranslator from "../hooks/useTranslator";
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";
import ImproveSuggestionBox from "../components/ImproveSuggestionBox";
import useImproveTranslation from "../hooks/useImproveTranslation";
import AIStudio from "../components/AIStudio";
import { useEffect, useState } from "react"; // useState hinzugefügt

export default function TranslatorPage() {
  const [showAIStudio, setShowAIStudio] = useState(false); // ← für AI Studio

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

  const {
    improvedText,
    isImproving,
    improveError,
    improveTranslation,
    resetImprovement,
  } = useImproveTranslation();

  useEffect(() => {
    resetImprovement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translatedText]);

  const handleApplySuggestion = () => {
    setTranslatedText(improvedText);
    resetImprovement();
  };

  return (
    <TranslatorLayout>
      <TranslatorHeader />

      {/*
        this wrapper is the positioning anchor for LanguageList
        relative + w-full means LanguageList can use absolute + top-full
        to sit exactly below the selector (– no hardcoded pixel values needed!!!)
      */}
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
        onImprove={() =>
          improveTranslation(
            sourceText,
            translatedText,
            chosenFirstLanguage,
            chosenSecondLanguage,
          )
        }
        isImproving={isImproving}
      />

      <CopyNotification visible={copied} />
      <ErrorBox error={error || improveError} />
      <ImproveSuggestionBox
        improvedText={improvedText}
        onApply={handleApplySuggestion}
        onDismiss={resetImprovement}
      />

      {/* temporary testing button */}
      <button
        onClick={() => setShowAIStudio(true)}
        className="mx-auto mt-5 block px-3 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        Open AI Studio (Test)
      </button>

      {/* AI studio modal */}
      {showAIStudio && (
        <AIStudio
          originalText={
            sourceText ||
            "Hallo, ich möchte gerne nächste Woche einen Termin bei Frau Müller vereinbaren."
          }
          currentTranslation={
            translatedText ||
            "Hello, I would like to book an appointment with Mrs. Muller next week."
          }
          sourceLang={chosenFirstLanguage || "German"}
          targetLang={chosenSecondLanguage || "English"}
          onApply={(newText) => {
            console.log("Applied new translation:", newText);
            setTranslatedText(newText);
            alert("New version applied! (See console)");
            setShowAIStudio(false);
          }}
          onClose={() => setShowAIStudio(false)}
        />
      )}
    </TranslatorLayout>
  );
}
