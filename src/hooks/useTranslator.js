import { useState, useRef } from "react";
import languagesList from "../data/languagesList";
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

  // Finds the ISO language code by language name
  const getLanguageCodeByName = (name) => {
    const lang = languagesList.languages.find((l) => l.name === name);
    return lang ? lang.code : "en";
  };

  // Copies text to clipboard
  const copyToClipboard = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  // Main translation function
  const translate = async (fromLang, toLang) => {
    setError("");
    setTranslatedText("");

    // Layer 1: validate input before making any API call
    if (!sourceText.trim()) {
      setError("Please enter some text first.");
      return;
    }

    // MyMemory Free API allows a maximum of 500 characters per request.
    // Without this check the API returns a broken or empty translation
    // with no clear error message.
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

      // Layer 2: check HTTP status explicitly.
      // fetch() only throws on network failure (no internet, DNS error).
      // Server responses like 429 or 500 always land in the try block –
      // res.ok is the only way to catch them.
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

      // Layer 3: check the API's own status code inside the response body.
      // MyMemory sometimes returns HTTP 200 but includes an error code in the
      // body (e.g. responseStatus 403 for invalid key, 429 for rate limiting).
      // Optional chaining (?.) prevents a crash if the structure is unexpected.
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
      // err.message is always a meaningful, user-readable string at this point
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
