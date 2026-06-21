import TextAreaBox from "../components/TextAreaBox";
import TranslateButton from "../components/TranslateButton";
import { getLanguageCodeByName } from "../data/languagesList";

export default function TranslatorBody({
  sourceText,
  translatedText,
  setSourceText,
  translate,
  isTranslating,
  chosenFirstLanguage,
  chosenSecondLanguage,
}) {
  // Cmd/Ctrl+Enter translates, Esc clears (plain Enter still allows line breaks)
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      translate(chosenFirstLanguage, chosenSecondLanguage);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setSourceText("");
    }
  };

  return (
    <div className="flex flex-col justify-center md:flex-row w-full lg:gap-4 gap-2 mt-3 sm:px-15">
      <TextAreaBox
        value={sourceText}
        onChange={setSourceText}
        onKeyDown={handleKeyDown}
        showClearButton={true}
        onClear={() => setSourceText("")}
        langCode={getLanguageCodeByName(chosenFirstLanguage)}
      />

      <div className="flex justify-center items-center ">
        <TranslateButton
          isTranslating={isTranslating}
          onClick={() => translate(chosenFirstLanguage, chosenSecondLanguage)}
        />
      </div>

      <TextAreaBox
        value={translatedText}
        readOnly={true}
        langCode={getLanguageCodeByName(chosenSecondLanguage)}
      />
    </div>
  );
}
