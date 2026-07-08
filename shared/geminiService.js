// Gemini API endpoint
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// hard limit to keep input safe and predictable
const MAX_TEXT_LENGTH = 500;

// validates all user inputs (short, strict, DRY)
function validateImproveInput({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
}) {
  const check = (label, value) =>
    typeof value !== "string" || !value.trim()
      ? `${label} is required.`
      : value.length > MAX_TEXT_LENGTH
        ? `${label} must be shorter than ${MAX_TEXT_LENGTH} characters.`
        : null;

  return [
    check("Source text", sourceText),
    check("Translated text", translatedText),
    !sourceLang?.trim() && "Source language is required.",
    !targetLang?.trim() && "Target language is required.",
  ].filter(Boolean);
}

// build minimal prompt for Gemini (no explanations in output)
function buildPostEditPrompt({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
}) {
  return `
You are a professional ${targetLang} translator doing automatic post-editing.
Improve the machine translation while preserving meaning, tone, and formality.
If it's already good, return it unchanged.
Respond ONLY with the improved ${targetLang} text.

Original (${sourceLang}):
${sourceText}

Machine translation (${targetLang}):
${translatedText}
`.trim();
}

// call Gemini, handle errors, return improved translation
async function improveTranslation({
  apiKey,
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
}) {
  const errors = validateImproveInput({
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
  });
  if (errors.length) return { status: 400, body: { error: errors[0], errors } };

  if (!apiKey)
    return { status: 500, body: { error: "AI service is not configured." } };

  const prompt = buildPostEditPrompt({
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
  });

  let res;
  try {
    // main Gemini request
    res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 512 }, // low temp = faithful editing
      }),
    });
  } catch {
    // network or connectivity issue
    return { status: 502, body: { error: "Could not reach the AI service." } };
  }

  // handle typical Gemini API errors
  if (!res.ok) {
    const msg =
      res.status === 429
        ? "AI service rate limit reached - please try again shortly."
        : res.status === 400 || res.status === 403
          ? "AI service rejected the request."
          : `AI service error (${res.status}).`;

    return { status: res.status === 429 ? 429 : 502, body: { error: msg } };
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];

  // extract text from all parts
  const improved = candidate?.content?.parts
    ?.map((p) => p.text?.trim())
    .filter(Boolean)
    .join("\n");

  // safety block or missing output
  if (!improved || candidate.finishReason === "SAFETY")
    return {
      status: 422,
      body: { error: "The AI service could not process this text." },
    };

  // success
  return {
    status: 200,
    body: { improvedText: improved, original: translatedText },
  };
}

module.exports = {
  improveTranslation,
  buildPostEditPrompt,
  validateImproveInput,
  MAX_TEXT_LENGTH,
};
