import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

// Reads the given text aloud. Renders nothing if unsupported.
export default function SpeakButton({
  text,
  langCode,
  speak,
  stop,
  isSpeaking,
  isSupported,
}) {
  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text, langCode);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!text?.trim()}
      title={isSpeaking ? "Stop" : "Listen"}
      className="absolute top-2 left-2 text-slate-300 cursor-pointer hover:text-white bg-black/20 hover:bg-black/30 p-1.5 rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {isSpeaking ? <HiSpeakerXMark size={16} /> : <HiSpeakerWave size={16} />}
    </button>
  );
}
