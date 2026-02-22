import { HiArrowPathRoundedSquare } from "react-icons/hi2";

export default function LanguageSelector({
  chosenFirstLanguage,
  chosenSecondLanguage,
  onSelectLanguage,
  onSwitchLanguages,
}) {
  return (
    <div className="text-white w-full min-h-35 flex justify-center items-center relative -mb-15 mr-auto">
      {/* First language selector */}
      <div className="lingo" onClick={() => onSelectLanguage("from")}>
        {chosenFirstLanguage}
      </div>

      {/* Swap languages button */}
      <HiArrowPathRoundedSquare
        size={42}
        className="mx-35 absolute hover:scale-105 hover:bg-white/10 rounded-2xl ease-in duration-150 cursor-pointer"
        onClick={onSwitchLanguages}
      />

      {/* Second language selector */}
      <div className="lingo" onClick={() => onSelectLanguage("to")}>
        {chosenSecondLanguage}
      </div>
    </div>
  );
}
