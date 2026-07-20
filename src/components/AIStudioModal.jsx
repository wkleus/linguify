import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Robot } from "@phosphor-icons/react";
import { useImproveTranslation } from "../hooks/useImproveTranslation";

const quickActions = [
  { label: "Make more formal", value: "Make this more formal" },
  { label: "Shorter", value: "Make this shorter" },
  { label: "More natural", value: "Make this more natural" },
  { label: "Friendlier", value: "Make this friendlier" },
  { label: "Back-translation", value: "Back translate for quality check" },
];

export default function AIStudioModal({
  isOpen,
  originalText,
  currentTranslation,
  setCurrentTranslation,
  sourceLanguage,
  targetLanguage,
  onClose,
}) {
  const { improveTranslation, isImproving } = useImproveTranslation();

  const [instruction, setInstruction] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isBackTranslation, setIsBackTranslation] = useState(false);

  if (!isOpen) return null;

  const runAI = async (customInstruction) => {
    setError("");
    setResult("");
    setIsBackTranslation(/back[\s-]?translat/i.test(customInstruction || ""));

    try {
      const { improvedTranslation } = await improveTranslation({
        originalText,
        translatedText: currentTranslation,
        sourceLang: sourceLanguage,
        targetLang: targetLanguage,
        customInstruction,
      });

      setResult(improvedTranslation);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
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
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-700 flex items-center justify-between bg-zinc-950">
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

        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          {/* Left side – texts + result */}
          <div className="md:w-5/12 md:border-r border-b md:border-b-0 border-zinc-700 p-4 sm:p-6 md:overflow-auto bg-zinc-950">
            <div className="mb-6">
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
                Original • {sourceLanguage}
              </p>
              <p className="text-zinc-200 text-xs leading-relaxed">
                {originalText}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
                Current Translation • {targetLanguage}
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
                        ? `BACK-TRANSLATION • ${sourceLanguage} (for comparison)`
                        : "RESULT"}
                    </span>
                    {!isBackTranslation && (
                      <button
                        onClick={() => setCurrentTranslation(result)}
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
          <div className="flex-1 p-4 sm:p-5 flex flex-col bg-zinc-900">
            <div className="mb-3">
              <p className="text-zinc-400 text-xs mb-2">FAST ACTIONS</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickActions.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => runAI(a.value)}
                    disabled={isImproving}
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
              placeholder="Enter custom instruction..."
              className="flex-1 min-h-32 sm:min-h-40 md:min-h-0 bg-zinc-800 border border-zinc-700 text-white p-4 rounded-3xl resize-none focus:outline-none focus:border-purple-500 text-xs"
            />

            <button
              onClick={() => runAI(instruction)}
              disabled={isImproving || !instruction.trim()}
              className="mt-5 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white font-medium rounded-2xl transition-colors text-sm"
            >
              {isImproving ? "AI is working..." : "Apply"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
