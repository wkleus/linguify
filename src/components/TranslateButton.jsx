import { FaCircleChevronRight } from "react-icons/fa6";

export default function TranslateButton({ isTranslating, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isTranslating} // Disable button while translating
      className="disabled:cursor-not-allowed text-white hover:scale-110 transition duration-200 cursor-pointer mx-2 sm:mx-3 relative w-9 h-9 sm:w-[30px] sm:h-[30px]"
    >
      {/* Both states stay mounted and cross-fade via opacity, instead of
          one element abruptly replacing the other */}
      <FaCircleChevronRight
        className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${
          isTranslating ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute inset-0 transition-opacity duration-200 ${
          isTranslating ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="block w-full h-full rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </span>
    </button>
  );
}
