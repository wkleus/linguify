import { FaCircleChevronRight } from "react-icons/fa6";

export default function TranslateButton({ isTranslating, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isTranslating} // Disable button while translating
      className="disabled:opacity-50 disabled:cursor-not-allowed text-white hover:scale-110 transition duration-200 cursor-pointer"
    >
      {/* Show loading dots or icon */}
      {isTranslating ? (
        <span className="mx-3 text-white text-sm">...</span>
      ) : (
        <FaCircleChevronRight size={30} className="mx-3" />
      )}
    </button>
  );
}
