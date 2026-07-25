import { supabase } from "./supabaseClient";

/**
 * Store translation in history table in Supabase DB
 */
export const saveTranslationToHistory = async ({
  sourceText,
  targetText,
  sourceLang,
  targetLang,
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
  });

  if (error) {
    console.error("Failed to save to history:", error);
    return null;
  }

  return true;
};

/**
 * Fetch current user's translation history
 */
export const fetchHistory = async () => {
  const { data, error } = await supabase
    .from("translation_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch history:", error);
    return [];
  }

  return data || [];
};
