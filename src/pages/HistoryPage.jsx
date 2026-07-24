import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CirclePattern from "../components/CirclePattern";
import { IoMdTime } from "react-icons/io";

// First: dummy data for the translation history -> NOTE: Later fetch from Supabase
const dummyHistory = [
  {
    id: 1,
    sourceText: "Hello, how are you today?",
    targetText: "Hallo, wie geht es dir heute?",
    sourceLang: "en",
    targetLang: "de",
    createdAt: "2026-07-23 14:32",
  },
  {
    id: 2,
    sourceText: "I love programming with React.",
    targetText: "Ich liebe das Programmieren mit React.",
    sourceLang: "en",
    targetLang: "de",
    createdAt: "2026-07-22 09:15",
  },
  {
    id: 3,
    sourceText: "Where is the nearest train station?",
    targetText: "Wo ist der nächste Bahnhof?",
    sourceLang: "en",
    targetLang: "de",
    createdAt: "2026-07-21 18:47",
  },
];

export default function HistoryPage() {
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

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Languages</option>
            <option>English → German</option>
            <option>German → English</option>
          </select>
          <input
            type="text"
            placeholder="Search translations..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* History List */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
          {dummyHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>{item.createdAt}</span>
                <span className="font-mono">
                  {item.sourceLang} → {item.targetLang}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Original
                  </p>
                  <p className="text-gray-800 line-clamp-3">
                    {item.sourceText}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Translation
                  </p>
                  <p className="text-gray-800 line-clamp-3">
                    {item.targetText}
                  </p>
                </div>
              </div>

              <button className="mt-4 text-blue-700 hover:text-blue-800 text-sm font-medium flex items-center gap-1 group-hover:underline">
                Restore to Translator →
              </button>
            </div>
          ))}
        </div>

        {dummyHistory.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No translations yet. Start translating!
          </p>
        )}
      </div>
    </motion.div>
  );
}
