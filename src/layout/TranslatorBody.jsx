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
  return (
    <div className="flex flex-col justify-center md:flex-row w-full lg:gap-4 gap-2 mt-3 sm:px-15 ">
      <TextAreaBox
        value={sourceText}
        onChange={setSourceText}
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
