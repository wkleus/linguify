import { useState } from "react";
import { buildApiUrl } from "../utils/apiUrl";
import { formatWaitTime } from "../utils/formatWaitTime";

// Calls the backend's /api/improve endpoint to apply a quick action or
// custom instruction to a translation
export function useImproveTranslation() {
  const [isImproving, setIsImproving] = useState(false);

  const improveTranslation = async ({
    originalText,
    translatedText,
    sourceLang,
    targetLang,
    customInstruction,
  }) => {
    setIsImproving(true);

    try {
      const res = await fetch(buildApiUrl("/api/improve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceText: originalText,
          translatedText,
          sourceLang,
          targetLang,
          instruction: customInstruction,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 429) {
          const wait = formatWaitTime(data.reset);
          throw new Error(
            wait
              ? `Too many requests – please wait ${wait} before trying again.`
              : data.error || "Too many requests – please try again later.",
          );
        }
        throw new Error(data.error || `Error (${res.status})`);
      }

      if (!data.improvedText) {
        throw new Error("No suggestion received. Please try again.");
      }

      return { improvedTranslation: data.improvedText };
    } finally {
      setIsImproving(false);
    }
  };

  return { improveTranslation, isImproving };
}
