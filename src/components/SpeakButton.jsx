import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { getSpeechRate } from "../utils/getSpeechRate";

// Reads the given text aloud. Renders nothing if unsupported.
export default function SpeakButton({
  text,
  langCode,
  speak,
  stop,
  isSpeaking,
  isSupported,
  rateLevel = "normal",
}) {
  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text, langCode, getSpeechRate(rateLevel, langCode));
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!text?.trim()}
      title={isSpeaking ? "Stop" : "Listen"}
      className="absolute top-2 left-2 text-slate-300 cursor-pointer hover:text-white bg-black/20 hover:bg-black/30 p-2.5 sm:p-1.5 rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {isSpeaking ? (
        <HiSpeakerXMark className="size-[18px] sm:size-4" />
      ) : (
        <HiSpeakerWave className="size-[18px] sm:size-4" />
      )}
    </button>
  );
}
