import { HiSparkles } from "react-icons/hi";

export default function ImproveButton({ isImproving, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isImproving}
      title="Improve with AI"
      className="disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 hover:text-white hover:scale-110 transition duration-200 cursor-pointer relative w-[22px] h-[22px]"
    >
      {/* Cross-fade like TranslateButton.jsx: both states stay mounted,
          fade via opacity instead of an abrupt swap */}
      <HiSparkles
        size={22}
        className={`absolute inset-0 transition-opacity duration-200 ${
          isImproving ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute inset-0 transition-opacity duration-200 ${
          isImproving ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="block w-[22px] h-[22px] rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </span>
    </button>
  );
}
