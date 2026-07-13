import languagesList from "../data/languagesList";

export default function LanguageList({
  visible,
  activeLanguage,
  chosenFirstLanguage,
  chosenSecondLanguage,
  onChooseLanguage,
  isClosing,
}) {
  if (!visible) return null;

  const currentLanguage =
    activeLanguage === "from" ? chosenFirstLanguage : chosenSecondLanguage;

  return (
    <div
      tabIndex={0}
      autoFocus
      className={`
        text-white absolute left-0 right-0
        top-full
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded-lg overflow-y-auto z-50 border border-white/60
        font-mono scrollbar-hide outline-none
       mt-1 md:mt-3 w-full h-[68vh] md:h-[48vh] xl:h-[47vh] 
        ${isClosing ? "animate-fadeSlideUp" : "animate-fadeSlideDown"}
      `}
    >
      <ul className="m-0 p-0">
        {languagesList.languages.map((language) => {
          const highlight = language.name === currentLanguage;

          return (
            <li
              key={language.code}
              onClick={() => onChooseLanguage(language)}
              className={`
                p-1.5 rounded-lg text-center cursor-pointer duration-300
                ${highlight ? "bg-white/20 font-bold" : "hover:bg-white/10"}
              `}
            >
              {language.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
