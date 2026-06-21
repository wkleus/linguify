// List of supported languages with their ISO codes
const languagesList = {
  languages: [
    { name: "German", code: "de" },
    { name: "English", code: "en" },
    { name: "French", code: "fr" },
    { name: "Spanish", code: "es" },
    { name: "Italian", code: "it" },
    { name: "Portuguese", code: "pt" },
    { name: "Dutch", code: "nl" },
    { name: "Swedish", code: "sv" },
    { name: "Norwegian", code: "no" },
    { name: "Danish", code: "da" },
    { name: "Finnish", code: "fi" },
    { name: "Polish", code: "pl" },
    { name: "Czech", code: "cs" },
    { name: "Hungarian", code: "hu" },
    { name: "Russian", code: "ru" },
    { name: "Turkish", code: "tr" },
    { name: "Arabic", code: "ar" },
    { name: "Chinese", code: "zh" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
  ],
};

// Shared helper – both translation and speech use this,
// so new languages only need to be added once, above.
export function getLanguageCodeByName(name) {
  const lang = languagesList.languages.find((l) => l.name === name);
  return lang ? lang.code : "en";
}

export default languagesList;
