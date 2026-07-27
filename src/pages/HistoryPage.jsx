import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import CirclePattern from "../components/CirclePattern";
import { IoMdTime } from "react-icons/io";
import {
  FiSearch,
  FiX,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
import { fetchHistory, deleteHistoryEntry } from "../utils/historyService";
import useDebounce from "../hooks/useDebounce";
import ConfirmModal from "../components/ConfirmModal";

// Number of history entries shown per page
const PAGE_SIZE = 5;

export default function HistoryPage() {
  // State for the list of history entries
  const [history, setHistory] = useState([]);
  // State for the ID of the entry to be deleted
  const [deleteId, setDeleteId] = useState(null);
  // Loading state while fetching data from Supabase
  const [loading, setLoading] = useState(true);
  // Error message if fetch fails
  const [error, setError] = useState(null);
  // Load history once when component mounts
  const navigate = useNavigate();

  // Search & filter state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const [sourceLangFilter, setSourceLangFilter] = useState("all");
  const [targetLangFilter, setTargetLangFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Language/date filters are collapsed by default on narrow (mobile) screens
  const [filtersOpen, setFiltersOpen] = useState(false);

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
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const success = await deleteHistoryEntry(deleteId);
    if (success) {
      setHistory((prev) => prev.filter((item) => item.id !== deleteId));
    }
    setDeleteId(null);
  };

  // Only offer languages that actually occur in the history for filtering,
  // instead of the full app-wide language list
  const sourceLangOptions = useMemo(
    () => [...new Set(history.map((item) => item.source_lang))].sort(),
    [history],
  );
  const targetLangOptions = useMemo(
    () => [...new Set(history.map((item) => item.target_lang))].sort(),
    [history],
  );

  const hasActiveFilters =
    debouncedSearchText.trim() !== "" ||
    sourceLangFilter !== "all" ||
    targetLangFilter !== "all" ||
    dateFrom !== "" ||
    dateTo !== "";

  const clearFilters = () => {
    setSearchText("");
    setSourceLangFilter("all");
    setTargetLangFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  // Apply text search, language filters and date range client-side
  const filteredHistory = useMemo(() => {
    const query = debouncedSearchText.trim().toLowerCase();
    // dateTo is inclusive of the whole day, so push it to 23:59:59
    const toDate = dateTo ? new Date(`${dateTo}T23:59:59.999`) : null;
    const fromDate = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;

    return history.filter((item) => {
      if (
        query &&
        !item.source_text.toLowerCase().includes(query) &&
        !item.target_text.toLowerCase().includes(query)
      ) {
        return false;
      }

      if (sourceLangFilter !== "all" && item.source_lang !== sourceLangFilter) {
        return false;
      }

      if (targetLangFilter !== "all" && item.target_lang !== targetLangFilter) {
        return false;
      }

      const createdAt = new Date(item.created_at);
      if (fromDate && createdAt < fromDate) return false;
      if (toDate && createdAt > toDate) return false;

      return true;
    });
  }, [
    history,
    debouncedSearchText,
    sourceLangFilter,
    targetLangFilter,
    dateFrom,
    dateTo,
  ]);

  // Reset to page 1 whenever filter changes
  const filterKey = `${debouncedSearchText}|${sourceLangFilter}|${targetLangFilter}|${dateFrom}|${dateTo}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / PAGE_SIZE));
  // Derived instead of stored: self-corrects if totalPages shrinks (e.g. after deleting last entry on last page)
  const safePage = Math.min(currentPage, totalPages);

  const paginatedHistory = useMemo(
    () =>
      filteredHistory.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredHistory, safePage],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-screen flex items-center justify-center p-4 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-600 overflow-hidden"
    >
      <CirclePattern className="absolute inset-0 w-full h-full" />

      <div className="max-w-4xl w-full max-h-[85vh] sm:max-h-[80vh] rounded-3xl shadow-xl p-4 sm:p-8 bg-white/90 backdrop-blur-2xl border border-blue-800/90 relative z-10 flex flex-col overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-8 shrink-0">
          <div className="flex items-center gap-3 text-blue-800">
            <IoMdTime className="text-3xl sm:text-4xl" />
            <h1 className="text-2xl sm:text-4xl font-bold">
              Translation History
            </h1>
          </div>
          <Link
            to="/translator"
            className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors text-center"
          >
            New Translation
          </Link>
        </div>

        {/* Search & Filter Bar */}
        {!loading && !error && history.length > 0 && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-white/70 border border-gray-200 space-y-3 shrink-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search in original or translated text..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Advanced filters toggle — mobile only. From sm: up, the
                filter row below is always visible regardless of this. */}
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="sm:hidden flex items-center gap-1.5 text-sm text-blue-700 font-medium"
              aria-expanded={filtersOpen}
            >
              <FiFilter size={14} />
              {filtersOpen ? "Hide filters" : "Language & date filters"}
              <FiChevronDown
                size={14}
                className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`${filtersOpen ? "flex" : "hidden"} sm:flex flex-wrap gap-3 items-end`}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="history-source-lang"
                  className="text-xs text-gray-500 mb-1"
                >
                  From language
                </label>
                <select
                  id="history-source-lang"
                  value={sourceLangFilter}
                  onChange={(e) => setSourceLangFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  {sourceLangOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="history-target-lang"
                  className="text-xs text-gray-500 mb-1"
                >
                  To language
                </label>
                <select
                  id="history-target-lang"
                  value={targetLangFilter}
                  onChange={(e) => setTargetLangFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  {targetLangOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="history-date-from"
                  className="text-xs text-gray-500 mb-1"
                >
                  From date
                </label>
                <input
                  id="history-date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  max={dateTo || undefined}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="history-date-to"
                  className="text-xs text-gray-500 mb-1"
                >
                  To date
                </label>
                <input
                  id="history-date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  min={dateFrom || undefined}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-800/5 transition-colors cursor-pointer"
                >
                  <FiX /> Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 py-12">Loading history...</p>
        )}

        {/* Error State */}
        {error && <p className="text-center text-red-500 py-12">{error}</p>}

        {/* Empty State (no history at all) */}
        {!loading && !error && history.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No translations yet. Start translating!
          </p>
        )}

        {/* Delete Modal */}
        <ConfirmModal
          isOpen={!!deleteId}
          title="Delete translation?"
          message="This entry will be permanently removed from your history."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />

        {/* No results for current filters */}
        {!loading &&
          !error &&
          history.length > 0 &&
          filteredHistory.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p className="mb-3">No translations match your filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="text-blue-700 hover:text-blue-800 font-medium hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}

        {/* History List */}
        {!loading && !error && filteredHistory.length > 0 && (
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 min-h-0">
            {paginatedHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-between text-sm text-gray-500 mb-3">
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
                  onClick={() => handleDeleteClick(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium mt-2 cursor-pointer"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && filteredHistory.length > PAGE_SIZE && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-4 mt-2 border-t border-gray-200 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-blue-700 hover:bg-blue-800/5 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FiChevronLeft /> Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {safePage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-blue-700 hover:bg-blue-800/5 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
