import { HiArrowPathRoundedSquare } from "react-icons/hi2";

export default function LanguageSelector({
  chosenFirstLanguage,
  chosenSecondLanguage,
  onSelectLanguage,
  onSwitchLanguages,
}) {
  return (
    <div className="text-white w-full min-h-15  md:min-h-35 flex justify-center items-center relative lg:-mb-18">
      {/* First language selector */}
      <div
        className="text-sm sm:text-lg  lingo -mb-5 md:-mb-30 lg:mb-5"
        onClick={() => onSelectLanguage("from")}
      >
        {chosenFirstLanguage}
      </div>

      {/* Swap languages button */}
      <div className="mx-8 md:-mb-30 lg:mb-5 flex justify-center items-center align-middle text-center">
        <HiArrowPathRoundedSquare
          className="size-7 -mb-5 sm:size-10 mx-35 md:mb-0 absolute hover:scale-105 hover:bg-white/10 rounded-2xl ease-in duration-150 cursor-pointer"
          onClick={onSwitchLanguages}
        />
      </div>

      {/* Second language selector */}
      <div
        className="lingo text-sm sm:text-lg md:text-lg -mb-5  md:-mb-30 lg:mb-5"
        onClick={() => onSelectLanguage("to")}
      >
        {chosenSecondLanguage}
      </div>
    </div>
  );
}
