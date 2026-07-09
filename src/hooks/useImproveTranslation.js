import { useState } from "react";
import { buildApiUrl } from "../utils/apiUrl";

export default function useImproveTranslation() {
  const [improvedText, setImprovedText] = useState("");
  const [isImproving, setIsImproving] = useState(false);
  const [improveError, setImproveError] = useState("");

  // clears a stale suggestion, e.g. after a new translation.
  const resetImprovement = () => {
    setImprovedText("");
    setImproveError("");
  };

  const improveTranslation = async (
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
  ) => {
    setImproveError("");
    setImprovedText("");

    if (!sourceText?.trim() || !translatedText?.trim()) {
      setImproveError("Please translate some text first.");
      return;
    }

    try {
      setIsImproving(true);

      const res = await fetch(buildApiUrl("/api/improve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceText,
          translatedText,
          sourceLang,
          targetLang,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || `Could not improve translation (${res.status}).`,
        );
      }

      if (!data.improvedText) {
        throw new Error("No suggestion received. Please try again.");
      }

      setImprovedText(data.improvedText);
    } catch (err) {
      setImproveError(err.message || "An unexpected error occurred.");
    } finally {
      setIsImproving(false);
    }
  };

  return {
    improvedText,
    isImproving,
    improveError,
    improveTranslation,
    resetImprovement,
  };
}
