import { motion } from "framer-motion";
import SpeechBubblePattern from "../components/SpeechBubblePattern";

export default function TranslatorLayout({ children }) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 blur-[160px]"></div>

      {/* Decorative background buuble pattern */}
      <SpeechBubblePattern className="absolute inset-0 w-full h-full" />

      {/* Card Container */}
      <div className="relative w-[95%] max-w-6xl h-[85vh] md:h-[80vh] text-xs sm:text-sm mx-15 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.25)]
 p-10 flex flex-col items-center justify-[safe_center] overflow-y-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
