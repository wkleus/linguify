import { useState, useEffect } from "react";
import SpeakButton from "./SpeakButton";
import useSpeech from "../hooks/useSpeech";
import { useSettingsContext } from "../context/useSettingsContext";

export default function TextAreaBox({
  value,
  onChange,
  readOnly = false,
  maxLength = 250,
  showClearButton = false,
  onClear,
  onKeyDown,
  langCode,
  animate = true,
}) {
  // Separate speech instance per box so input/output can be controlled independently
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const { speechRate } = useSettingsContext();

  // Briefly animates the read-only box when a new translation arrives
  // (textarea content can't be CSS-transitioned directly)
  // Skipped during live translation to avoid flickering on every keystroke
  const [justArrived, setJustArrived] = useState(false);
  const [previousValue, setPreviousValue] = useState(value);

  // Detect the value change during render itself instead of in an Effect - avoids an extra render pass.
  // Use state rather than a ref, since refs must not be read/written during render
  if (value !== previousValue) {
    const shouldAnimate = animate && readOnly && value;
    setPreviousValue(value);
    if (shouldAnimate) setJustArrived(true);
  }

  // Auto-clear the flash after it has played
  useEffect(() => {
    if (!justArrived) return;
    const timeout = setTimeout(() => setJustArrived(false), 400);
    return () => clearTimeout(timeout);
  }, [justArrived]);

  // CJK languages render better in Noto Sans JP than in the default Latin font
  const isCjk = ["ja", "zh", "ko"].includes(langCode);

  return (
    <div className="relative flex justify-center w-full mt-1">
      {/* Main textarea */}
      <textarea
        maxLength={maxLength}
        className={`text-box ${isCjk ? "font-cjk" : ""} ${
          value.length === maxLength ? "border-red-500! border-3!" : ""
        } ${justArrived ? "text-box-arrive" : ""} h-50 md:h-80 lg:h-70`}
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
          rateLevel={speechRate}
        />
      )}

      {/* Clear button */}
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
