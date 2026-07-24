import { supabase } from "./supabaseClient";

/**
 * Store translation in history table in Supabase DB
 */
export const saveTranslationToHistory = async ({
  sourceText,
  targetText,
  sourceLang,
  targetLang,
  originalTranslation = null,
  finalTranslation = null,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.warn("No user logged in - skipping history save");
    return null;
  }

  const { error } = await supabase.from("translation_history").insert({
    user_id: user.id,
    source_text: sourceText,
    target_text: targetText,
    source_lang: sourceLang,
    target_lang: targetLang,
    original_translation: originalTranslation,
    final_translation: finalTranslation,
  });

  if (error) {
    console.error("Failed to save to history:", error);
    return null;
  }

  return true;
};
