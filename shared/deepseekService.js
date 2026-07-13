// DeepSeek API – OpenAI-compatible endpoint
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-v4-flash"; // deepseek-v4-flash = fast & cheapest model

// Hard limit to keep input safe and predictable
const MAX_TEXT_LENGTH = 500;

// Max length for the free-text / quick-action instruction
const MAX_INSTRUCTION_LENGTH = 200;

// Validates all user inputs
function validateImproveInput({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
  instruction,
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
    instruction != null &&
      typeof instruction === "string" &&
      instruction.length > MAX_INSTRUCTION_LENGTH &&
      `Instruction must be shorter than ${MAX_INSTRUCTION_LENGTH} characters.`,
  ].filter(Boolean);
}

// Build prompt - when an instruction (quick action or free text) is given,
// it takes priority and steers the edit; otherwise fall back to generic post-editing
function buildPostEditPrompt({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
  instruction,
}) {
  const trimmedInstruction =
    typeof instruction === "string" ? instruction.trim() : "";

  // Back-translation is a special quality-check action: it must translate the
  // *translation* back into the *source* language, not follow the generic
  // "stay in targetLang" template used by other quick actions.
  if (/back[\s-]?translat/i.test(trimmedInstruction)) {
    return `You are a professional ${sourceLang} translator performing a back-translation for quality control.
Translate the following ${targetLang} text literally back into ${sourceLang}, so it can be compared against the original.
Respond ONLY with the back-translated ${sourceLang} text, no explanations.

Text to back-translate (${targetLang}):
${translatedText}`.trim();
  }

  if (trimmedInstruction) {
    return `You are a professional ${targetLang} translator doing automatic post-editing.
Apply the following instruction to the machine translation: "${trimmedInstruction}"
Preserve the original meaning unless the instruction explicitly asks to change tone/length/style.
Respond ONLY with the resulting ${targetLang} text, no explanations.

Original (${sourceLang}):
${sourceText}

Machine translation (${targetLang}):
${translatedText}`.trim();
  }

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
  instruction,
}) {
  const errors = validateImproveInput({
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
    instruction,
  });
  if (errors.length) return { status: 400, body: { error: errors[0], errors } };

  if (!apiKey)
    return { status: 500, body: { error: "AI service is not configured." } };

  const prompt = buildPostEditPrompt({
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
    instruction,
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
  MAX_INSTRUCTION_LENGTH,
};
