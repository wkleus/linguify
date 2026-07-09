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

export default function TranslatorPage() {
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

      {/*
        This wrapper is the positioning anchor for LanguageList.
        relative + w-full means LanguageList can use absolute + top-full
        to sit exactly below the selector – no hardcoded pixel values needed.
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
      />

      <CopyNotification visible={copied} />
      <ErrorBox error={error} />

      <ImproveSuggestionBox
        improvedText="Test suggestion to check the layout..."
        onApply={() => console.log("apply clicked")}
        onDismiss={() => console.log("dismiss clicked")}
      />
    </TranslatorLayout>
  );
}
