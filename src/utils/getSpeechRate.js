// Web Speech API voices interpret `rate` very differently per language/engine
// -> instead of one fixed multiplier, each level maps to a different rate depending on whether the language is German
const RATE_TABLE = {
  de: { slow: 0.6, normal: 1, fast: 2 },
  default: { slow: 0.8, normal: 1, fast: 1.2 },
};

// level: "slow" | "normal" | "fast", langCode: e.g. "de", "en", "fr"
export function getSpeechRate(level, langCode) {
  const table = langCode === "de" ? RATE_TABLE.de : RATE_TABLE.default;
  return table[level] ?? 1;
}
