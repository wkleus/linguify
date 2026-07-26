import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import CirclePattern from "../components/CirclePattern";
import { IoMdTime } from "react-icons/io";
import { fetchHistory, deleteHistoryEntry } from "../utils/historyService";
import { FiTrash2 } from "react-icons/fi";

export default function HistoryPage() {
  // State for the list of history entries
  const [history, setHistory] = useState([]);
  // Loading state while fetching data from Supabase
  const [loading, setLoading] = useState(true);
  // Error message if fetch fails
  const [error, setError] = useState(null);
  // Load history once when component mounts
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true); // Start loading
        const data = await fetchHistory(); // Fetch from Supabase
        setHistory(data); // Store result
      } catch (err) {
        setError("Failed to load history.");
        console.error(err);
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    loadHistory(); // Trigger the fetch
  }, []); // Run only once on mount

  // Restore entry → go to Translator with data
  const handleRestore = (item) => {
    navigate("/translator", {
      state: {
        restore: {
          sourceText: item.source_text,
          targetText: item.target_text,
          sourceLang: item.source_lang,
          targetLang: item.target_lang,
        },
      },
    });
  };

  // Delete entry from history table in Supabase DB and remove from list
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this translation from history?");
    if (!confirmed) return;

    const success = await deleteHistoryEntry(id);
    if (success) {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-600"
    >
      <CirclePattern className="absolute inset-0 w-full h-full" />

      <div className="max-w-4xl w-full rounded-3xl shadow-xl p-8 bg-white/90 backdrop-blur-2xl border border-blue-800/90 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 text-blue-800">
            <IoMdTime className="text-4xl" />
            <h1 className="text-4xl font-bold">Translation History</h1>
          </div>
          <Link
            to="/translator"
            className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            New Translation
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 py-12">Loading history...</p>
        )}

        {/* Error State */}
        {error && <p className="text-center text-red-500 py-12">{error}</p>}

        {/* Empty State */}
        {!loading && !error && history.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No translations yet. Start translating!
          </p>
        )}

        {/* History List */}
        {!loading && !error && history.length > 0 && (
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>{new Date(item.created_at).toLocaleString()}</span>
                  <span className="font-mono">
                    {item.source_lang} → {item.target_lang}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Original
                    </p>
                    <p className="text-gray-800 line-clamp-3">
                      {item.source_text}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Translation
                    </p>
                    <p className="text-gray-800 line-clamp-3">
                      {item.target_text}
                    </p>
                  </div>
                </div>

                {/* Restore Button */}
                <button
                  onClick={() => handleRestore(item)}
                  className="mt-4 text-blue-700 hover:text-blue-800 text-sm font-medium hover:underline"
                >
                  Restore to Translator →
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
