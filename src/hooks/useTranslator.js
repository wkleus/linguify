import { useState, useRef } from "react";
import { getLanguageCodeByName } from "../data/languagesList";
import { useSettingsContext } from "../context/SettingsContext";

export default function useTranslator() {
  // Text states
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // UI states
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Settings come from Context – reactive: changes take effect immediately
  const { autoClearInstant, autoClearDelay, autoCopy } = useSettingsContext();

  // Ref for delayed clearing timeout
  const clearTimeoutRef = useRef(null);

  // Copies text to clipboard
  const copyToClipboard = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  // Main translation function
  const translate = async (fromLang, toLang) => {
    setError("");
    setTranslatedText("");

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

  return {
    sourceText,
    translatedText,
    isTranslating,
    error,
    copied,
    setSourceText,
    setTranslatedText,
    translate,
  };
}
