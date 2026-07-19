import languagesList from "../data/languagesList";

export default function DefaultLanguageOption({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
}) {
  return (
    <div className="ml-5 flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/20 gap-3">
      <span className="flex items-center text-sm sm:text-[15px]">
        Default languages
      </span>

      <div className="flex items-center gap-2">
        <select
          value={sourceLanguage}
          onChange={(e) => onSourceChange(e.target.value)}
          className="bg-white/10 text-white text-xs sm:text-sm rounded-md px-2 py-1.5 border border-white/20 cursor-pointer [&>option]:text-black"
        >
          {languagesList.languages.map((lang) => (
            <option key={lang.code} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>

        <span className="text-white/50 text-xs">→</span>

        <select
          value={targetLanguage}
          onChange={(e) => onTargetChange(e.target.value)}
          className="bg-white/10 text-white text-xs sm:text-sm rounded-md px-2 py-1.5 border border-white/20 cursor-pointer [&>option]:text-black"
        >
          {languagesList.languages.map((lang) => (
            <option key={lang.code} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
