import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdClose, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tooltip from "../components/Tooltip";

export default function SynonymFinderPage() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findSynonyms = async () => {
    setError("");
    setSynonyms([]);

    if (!word.trim()) {
      setError("Please enter a word.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}`,
      );
      const data = await res.json();

      // Keep only clean single words (no phrases, no special characters)
      const filtered = data
        .map((item) => item.word)
        .filter(
          (w) =>
            /^[a-zA-ZäöüÄÖÜß]+$/.test(w) && !w.includes(" ") && w.length <= 15,
        );

      if (!filtered.length) {
        setError("No synonyms found.");
        return;
      }

      setSynonyms(filtered);
    } catch (err) {
      setError("Error fetching synonyms: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[90%] max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-10 flex flex-col items-center gap-6"
      >
        <h1 className="uppercase font-bold text-2xl sm:text-3xl text-amber-400 tracking-tight sm:tracking-wide">
          Synonym Finder
        </h1>

        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose className="size-3 sm:size-6 " />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col gap-4 items-center"
        >
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && findSynonyms()}
            placeholder="Enter a word..."
            className="w-full p-1 sm:p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm sm:text-md"
          />

          <Tooltip text="This tool works best with common English words. Phrases, rare terms, or non-English words may produce inaccurate results. Enter a single word at a time.">
            <p className="flex text-white/70 text-xs italic items-center gap-1 -mt-2 cursor-default">
              <MdInfo size={16} />
              English only · Single words recommended
            </p>
          </Tooltip>

          <button
            onClick={findSynonyms}
            disabled={loading}
            className="bg-amber-600 text-white font-bold py-1 px-3 text-sm sm:text-md sm:py-3 sm:px-6 rounded-xl hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Find Synonyms"}
          </button>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-200 bg-red-900/40 px-4 py-2 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {synonyms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-white/10 p-4 rounded-xl border border-white/20 text-white"
            >
              <h2 className="font-bold mb-3">Synonyms:</h2>
              <div className="flex flex-wrap gap-2 text-sm sm:text-md">
                {synonyms.map((syn, i) => (
                  <motion.span
                    key={syn}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white/20 px-3 py-1 rounded-lg border border-white/30"
                  >
                    {syn}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
