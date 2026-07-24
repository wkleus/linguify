import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";

// User avatar - click opens dropdown with user's email and sign-out button
export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
  };

  return (
    <div ref={ref} className="absolute top-5 left-5 z-50">
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5 bg-black/25 hover:bg-white/20 border border-white/20 text-white rounded-2xl px-6 py-2 text-md font-medium transition-all duration-200 cursor-pointer backdrop-blur-md"
      >
        <FiUser size={16} />
        <span className="max-w-25 truncate">{displayName}</span>
        <FiChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1.5 w-52 bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* User email */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-white/70 text-[10px] uppercase tracking-widest mb-1">
                Signed in as
              </p>
              <p className="text-white text-sm truncate">{user.email}</p>
            </div>

            {/* Sign out */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-4 text-xs text-red-300 hover:bg-black/30 transition-colors duration-150 cursor-pointer uppercase"
            >
              <FiLogOut size={14} />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
