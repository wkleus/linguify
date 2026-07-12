// DeepSeek API – OpenAI-compatible endpoint
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-v4-flash"; // deepseek-v4-flash = fast & cheapest model

// Hard limit to keep input safe and predictable
const MAX_TEXT_LENGTH = 500;

// Validates all user inputs
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

// Build minimal prompt (no explanations in output)
function buildPostEditPrompt({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
}) {
  return `You are a professional ${targetLang} translator doing automatic post-editing.
Improve the machine translation while preserving meaning, tone, and formality.
If it's already good, return it unchanged.
Respond ONLY with the improved ${targetLang} text.

Original (${sourceLang}):
${sourceText}

Machine translation (${targetLang}):
${translatedText}`.trim();
}

// Call DeepSeek, handle errors, return improved translation
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
    res = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // DeepSeek uses Bearer token, unlike Gemini's x-goog-api-key
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3, // low temp = faithful editing, minimal creativity
        max_tokens: 512,
      }),
    });
  } catch {
    return { status: 502, body: { error: "Could not reach the AI service." } };
  }

  // Handle typical DeepSeek API errors
  if (!res.ok) {
    const msg =
      res.status === 429
        ? "AI service rate limit reached – please try again shortly."
        : res.status === 401
          ? "AI service authentication failed."
          : res.status === 400 || res.status === 403
            ? "AI service rejected the request."
            : `AI service error (${res.status}).`;

    return { status: res.status === 429 ? 429 : 502, body: { error: msg } };
  }

  const data = await res.json();

  // DeepSeek follows OpenAI response shape: choices[0].message.content
  const improved = data.choices?.[0]?.message?.content?.trim();

  if (!improved)
    return {
      status: 422,
      body: { error: "The AI service could not process this text." },
    };

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
