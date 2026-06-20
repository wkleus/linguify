import TextAreaBox from "../components/TextAreaBox";
import TranslateButton from "../components/TranslateButton";

export default function TranslatorBody({
  sourceText,
  translatedText,
  setSourceText,
  translate,
  isTranslating,
  chosenFirstLanguage,
  chosenSecondLanguage,
}) {
  // Keyboard shortcuts on the source textarea:
  // - Cmd/Ctrl + Enter → trigger translation
  // - Esc → clear the input
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
    <div className="flex flex-col justify-center md:flex-row w-full lg:gap-4 gap-2 mt-3 sm:px-15 ">
      <TextAreaBox
        value={sourceText}
        onChange={setSourceText}
        onKeyDown={handleKeyDown}
        showClearButton={true}
        onClear={() => setSourceText("")}
      />

      <div className="flex justify-center items-center">
        <TranslateButton
          isTranslating={isTranslating}
          onClick={() => translate(chosenFirstLanguage, chosenSecondLanguage)}
        />
      </div>

      <TextAreaBox value={translatedText} readOnly={true} />
    </div>
  );
}
