export default function TextAreaBox({
  value,
  onChange,
  readOnly = false,
  maxLength = 250,
  showClearButton = false,
  onClear,
  onKeyDown,
}) {
  return (
    <div className="relative flex justify-center">
      {/* Main textarea */}
      <textarea
        maxLength={maxLength}
        className={`text-box ${
          value.length === maxLength ? "!border-red-500 !border-3" : ""
        }`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        placeholder={readOnly ? "Translated text..." : "Enter your text..."}
      />

      {/* Optional clear button */}
      {showClearButton && (
        <button
          onClick={onClear}
          className="absolute top-2 right-2 text-slate-300 cursor-pointer hover:text-white bg-black/20 hover:bg-black/30 px-2 py-1 rounded-md text-xs transition"
        >
          Clear
        </button>
      )}

      {/* Character counter (only for editable textarea) */}
      {!readOnly && (
        <div
          className={`absolute bottom-2 right-2 text-xs ${
            value.length === maxLength
              ? "text-red-500 font-bold"
              : "text-slate-300"
          }`}
        >
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
