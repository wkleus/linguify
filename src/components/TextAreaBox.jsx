import { useState, useEffect, useRef } from "react";
import SpeakButton from "./SpeakButton";
import useSpeech from "../hooks/useSpeech";

export default function TextAreaBox({
  value,
  onChange,
  readOnly = false,
  maxLength = 250,
  showClearButton = false,
  onClear,
  onKeyDown,
  langCode,
}) {
  // Separate speech instance per box so input/output can be controlled independently
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  // Briefly animates the read-only box when a new translation arrives
  // (textarea content can't be CSS-transitioned directly)
  const [justArrived, setJustArrived] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (readOnly && value && value !== previousValue.current) {
      setJustArrived(true);
      const timeout = setTimeout(() => setJustArrived(false), 400);
      previousValue.current = value;
      return () => clearTimeout(timeout);
    }
    previousValue.current = value;
  }, [value, readOnly]);

  // CJK languages render better in Noto Sans JP than in the default Latin font
  const isCjk = ["ja", "zh", "ko"].includes(langCode);

  return (
    <div className="relative flex justify-center w-full  ">
      {/* Main textarea */}
      <textarea
        maxLength={maxLength}
        className={`text-box ${isCjk ? "font-cjk" : ""} ${
          value.length === maxLength ? "!border-red-500 !border-3" : ""
        } ${justArrived ? "text-box-arrive" : ""}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        placeholder={readOnly ? "Translated text..." : "Enter your text..."}
      />

      {/* Text-to-speech button */}
      {langCode && (
        <SpeakButton
          text={value}
          langCode={langCode}
          speak={speak}
          stop={stop}
          isSpeaking={isSpeaking}
          isSupported={isSupported}
        />
      )}

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
