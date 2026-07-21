import { HiArrowPathRoundedSquare } from "react-icons/hi2";

export default function LanguageSelector({
  chosenFirstLanguage,
  chosenSecondLanguage,
  onSelectLanguage,
  onSwitchLanguages,
}) {
  return (
    <div className="text-white w-full min-h-15 md:min-h-35 flex justify-center items-center gap-4 sm:gap-8 relative lg:-mb-18">
      {/* First language selector */}
      <div
        className="text-sm sm:text-lg lingo -mb-5 md:-mb-30 lg:mb-5 cursor-pointer"
        onClick={() => onSelectLanguage("from")}
      >
        {chosenFirstLanguage}
      </div>

      {/* Swap languages button */}
      <div className="-mb-5 md:mt-25 lg:mt-0 lg:mb-5 flex justify-center items-center align-middle text-center shrink-0">
        <HiArrowPathRoundedSquare
          className="size-6 sm:size-8 md:size-10 hover:scale-105 hover:bg-white/10 rounded-2xl ease-in duration-150 cursor-pointer"
          onClick={onSwitchLanguages}
        />
      </div>

      {/* Second language selector */}
      <div
        className="lingo text-sm sm:text-lg md:text-lg -mb-5 md:-mb-30 lg:mb-5 cursor-pointer"
        onClick={() => onSelectLanguage("to")}
      >
        {chosenSecondLanguage}
      </div>
    </div>
  );
}
