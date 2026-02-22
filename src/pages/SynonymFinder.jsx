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

      // Filter: nur „saubere“ Synonyme behalten
      const filtered = data
        .map((item) => item.word)
        .filter(
          (w) =>
            /^[a-zA-ZäöüÄÖÜß]+$/.test(w) && // nur Buchstaben
            !w.includes(" ") && // keine Phrasen
            w.length <= 15, // keine extrem langen Wörter
        );

      if (!filtered.length) {
        setError("No clean synonyms found.");
        return;
      }

      setSynonyms(filtered);
    } catch (err) {
      setError("Error fetching synonyms. Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-[90%] max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-10 flex flex-col items-center gap-6">
        {/* HEADER */}
        <h1 className="uppercase font-bold text-3xl text-amber-400 tracking-wide">
          Synonym Finder
        </h1>

        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        {/* INPUT */}
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30"
        />

        <div className="relative group flex items-center text-white/70 text-xs -mt-3 italic cursor-default">
          {/* Tooltip */}
          <Tooltip text="This tool works best with common English words. Phrases, rare terms, or non-English words may produce inaccurate results. It is recommended to enter a single word at a time.">
            <p className="flex text-white/70 text-xs italic items-center">
              <MdInfo size={16} className="mr-1" />
              English only • Single words recommended
            </p>
          </Tooltip>
        </div>

        {/* BUTTON */}
        <button
          onClick={findSynonyms}
          disabled={loading}
          className="bg-amber-600 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition disabled:opacity-50 mt-2"
        >
          {loading ? "Searching..." : "Find Synonyms"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="text-red-200 bg-red-900/40 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* RESULTS */}
        {synonyms.length > 0 && (
          <div className="w-full bg-white/10 p-4 rounded-xl border border-white/20 text-white">
            <h2 className="font-bold mb-2">Synonyms:</h2>
            <div className="flex flex-wrap gap-2">
              {synonyms.map((syn, i) => (
                <span
                  key={i}
                  className="bg-white/20 px-3 py-1 rounded-lg border border-white/30"
                >
                  {syn}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
