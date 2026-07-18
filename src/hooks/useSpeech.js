import { useState, useCallback, useEffect } from "react";

// Wraps the browser's Web Speech API – no backend needed.
export default function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Not all browsers support this; check once to avoid runtime errors.
  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  // Stop speech if the component unmounts mid-utterance.
  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const speak = useCallback(
    (text, langCode, rate) => {
      if (!isSupported || !text?.trim()) return;

      // Cancel first, or overlapping clicks queue up and speak one after another.
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = rate;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported],
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
