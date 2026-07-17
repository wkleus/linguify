import TextAreaBox from "../components/TextAreaBox";
import TranslateButton from "../components/TranslateButton";
import { getLanguageCodeByName } from "../data/languagesList";
import ImproveButton from "../components/ImproveButton";
import { useSettingsContext } from "../context/useSettingsContext";

export default function TranslatorBody({
  sourceText,
  translatedText,
  setSourceText,
  translate,
  isTranslating,
  chosenFirstLanguage,
  chosenSecondLanguage,
  onImprove,
  isImproving,
}) {
  const { liveTranslation } = useSettingsContext();

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
    <div className="flex flex-col justify-center md:flex-row w-full lg:gap-4 gap-2 md:mt-3  sm:px-15">
      <div className="relative flex-1">
        <TextAreaBox
          value={sourceText}
          onChange={setSourceText}
          onKeyDown={handleKeyDown}
          showClearButton={true}
          onClear={() => setSourceText("")}
          langCode={getLanguageCodeByName(chosenFirstLanguage)}
        />
      </div>

      <div className="flex justify-center items-center ">
        <TranslateButton
          isTranslating={isTranslating}
          onClick={() => translate(chosenFirstLanguage, chosenSecondLanguage)}
        />
      </div>

      <div className="relative flex-1">
        <TextAreaBox
          value={translatedText}
          readOnly={true}
          langCode={getLanguageCodeByName(chosenSecondLanguage)}
          animate={!liveTranslation}
        />

        {/* Speak button positioned at top left, Clear button appears only in the editable field, 
        AI suggestion button appears only in the read-only field after translation */}
        <div className="absolute top-2 right-2">
          <ImproveButton
            isImproving={isImproving}
            disabled={!translatedText?.trim()}
            onClick={onImprove}
          />
        </div>
      </div>
    </div>
  );
}
