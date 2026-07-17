import { useState, useRef, useEffect } from "react";
import { getLanguageCodeByName } from "../data/languagesList";
import { useSettingsContext } from "../context/useSettingsContext";
import useDebounce from "./useDebounce";

export default function useTranslator() {
  // Text states
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // UI states
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Language state – needed for live translation trigger
  const [currentLangs, setCurrentLangs] = useState({
    from: "German",
    to: "English",
  });

  // Settings come from Context – reactive: changes take effect immediately
  const { autoClearInstant, autoClearDelay, autoCopy, liveTranslation } =
    useSettingsContext();

  // Ref for delayed clearing timeout
  const clearTimeoutRef = useRef(null);

  // Debounced source text – only updates 700ms after typing stops - used exclusively for live translation to avoid excessive API calls
  const debouncedText = useDebounce(sourceText, 700);

  // Copies text to clipboard
  const copyToClipboard = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  // Main translation function
  // isLive=true skips clearing the output field so old translation stays visible until new one arrives (avoids blank flash)
  const translate = async (fromLang, toLang, isLive = false) => {
    setError("");
    if (!isLive) setTranslatedText("");

    // Layer 1: validate before any API call
    if (!sourceText.trim()) {
      setError("Please enter some text first.");
      return;
    }

    // MyMemory's free API caps requests at 500 characters
    if (sourceText.length > 500) {
      setError("Text too long – please keep it under 500 characters.");
      return;
    }

    const sourceCode = getLanguageCodeByName(fromLang);
    const targetCode = getLanguageCodeByName(toLang);

    if (sourceCode === targetCode) {
      setError("The source and target languages should be different.");
      return;
    }

    // Keep track of current languages for live translation
    setCurrentLangs({ from: fromLang, to: toLang });

    try {
      setIsTranslating(true);

      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          sourceText,
        )}&langpair=${sourceCode}|${targetCode}`,
      );

      // Layer 2: fetch() only throws on network failure, so check res.ok
      // explicitly to catch server errors like 429 or 500
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            "Rate limit reached – please wait a moment and try again.",
          );
        }
        throw new Error(
          `Translation service error (${res.status}). Please try again later.`,
        );
      }

      const data = await res.json();

      // Layer 3: MyMemory can return HTTP 200 with an error code inside
      // the body (e.g. 403 invalid key, 429 rate limit)
      if (data.responseStatus && data.responseStatus !== 200) {
        throw new Error(
          `Translation failed (code ${data.responseStatus}). Please try again.`,
        );
      }

      if (!data.responseData?.translatedText) {
        throw new Error(
          "No translation received. Please try a different text.",
        );
      }

      const translated = data.responseData.translatedText;
      setTranslatedText(translated);

      // Auto-copy feature
      if (autoCopy) {
        copyToClipboard(translated);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }

      // Instant clear
      if (autoClearInstant) {
        setSourceText("");
      }

      // Delayed clear
      if (autoClearDelay) {
        if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = setTimeout(() => {
          setSourceText("");
        }, 3000);
      }
    } catch (err) {
      // err.message is always user-readable here
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsTranslating(false);
    }
  };

  // Live translation: fires automatically when debouncedText changes - but only if user enables it in Settings
  // Guards: skip if empty, too long or translation is already running
  useEffect(() => {
    if (!liveTranslation) return;
    if (!debouncedText.trim()) return;
    if (debouncedText.length > 500) return;
    if (isTranslating) return;

    translate(currentLangs.from, currentLangs.to, true);
    // currentLangs, isTranslating and translate are intentionally excluded:
    // this should only re-fire when the debounced text or the setting changes,
    // not on every language switch or translate() identity change (which would
    // cause infinite loops / duplicate requests).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText, liveTranslation]);

  return {
    sourceText,
    translatedText,
    isTranslating,
    error,
    copied,
    setSourceText,
    setTranslatedText,
    translate,
    setCurrentLangs,
  };
}
