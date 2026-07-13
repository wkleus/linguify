import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Robot } from "@phosphor-icons/react";
import { buildApiUrl } from "../utils/apiUrl";

const quickActions = [
  { label: "More formal", value: "Make this more formal" },
  { label: "More natural", value: "Make this more natural" },
  { label: "Friendlier", value: "Make this friendlier" },
  { label: "Back-translation", value: "Back translate for quality check" },
];

export default function AIStudio({
  originalText,
  currentTranslation,
  sourceLang,
  targetLang,
  onApply,
  onClose,
}) {
  const [instruction, setInstruction] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isBackTranslation, setIsBackTranslation] = useState(false);

  const runAI = async (customInstruction) => {
    setError("");
    setResult("");
    setLoading(true);
    setIsBackTranslation(/back[\s-]?translat/i.test(customInstruction || ""));

    try {
      const res = await fetch(buildApiUrl("/api/improve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceText: originalText,
          translatedText: currentTranslation,
          sourceLang,
          targetLang,
          instruction: customInstruction,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Error (${res.status})`);
      }

      if (!data.improvedText) {
        throw new Error("No suggestion received. Please try again.");
      }

      setResult(data.improvedText);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-zinc-900 text-white w-full h-full max-w-6xl max-h-[100vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-zinc-700"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-700 flex items-center justify-between bg-zinc-950">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Robot size={24} weight="bold" />
            AI Studio
          </h2>
          <button
            onClick={onClose}
            className="text-3xl text-zinc-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left side – texts + result */}
          <div className="w-5/12 border-r border-zinc-700 p-6 overflow-auto bg-zinc-950">
            <div className="mb-6">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
                Original • {sourceLang}
              </p>
              <p className="text-zinc-200 text-xs leading-relaxed">
                {originalText}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
                Current Translation • {targetLang}
              </p>
              <p className="text-blue-400 text-xs leading-relaxed">
                {currentTranslation}
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-red-950 border border-red-800 rounded-2xl text-xs text-red-300"
                >
                  {error}
                </motion.div>
              )}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <div className="flex justify-between mb-2 text-xs text-zinc-400">
                    <span>
                      {isBackTranslation
                        ? `BACK-TRANSLATION • ${sourceLang} (for comparison)`
                        : "RESULT"}
                    </span>
                    {!isBackTranslation && (
                      <button
                        onClick={() => onApply(result)}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  <div className="p-3 bg-emerald-950 border border-emerald-900 rounded-3xl text-xs text-emerald-100 leading-relaxed">
                    {result}
                  </div>
                  {isBackTranslation && (
                    <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed">
                      Compare this against the original text above to check
                      translation quality. Not applied automatically.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side – controls */}
          <div className="flex-1 px-10 py-25 md:py-20 lg:px-20 lg:py-15 flex flex-col bg-zinc-900">
            <div className="mb-3">
              <p className="text-zinc-400 text-xs mb-2">FAST ACTIONS</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => runAI(a.value)}
                    disabled={loading}
                    className="text-left text-xs py-2 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter your prompt here..."
              className="flex-1 bg-zinc-800 border border-zinc-700 text-white p-4 rounded-3xl resize-none focus:outline-none focus:border-purple-500 text-xs"
            />

            <button
              onClick={() => runAI(instruction)}
              disabled={loading || !instruction.trim()}
              className="mt-5 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white font-medium rounded-2xl transition-colors text-sm"
            >
              {loading ? "AI is working..." : "Optimize with AI"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
