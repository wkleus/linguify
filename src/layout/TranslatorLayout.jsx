import { motion } from "framer-motion";
import SpeechBubblePattern from "../components/SpeechBubblePattern";

export default function TranslatorLayout({ children }) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 blur-[160px]"></div>

      {/* Decorative background buuble pattern */}
      <SpeechBubblePattern className="absolute inset-0 w-full h-full" />

      {/* Card Container */}
      <div className="relative w-[95%] max-w-5xl h-[92vh] sm:h-[85vh] md:h-[75vh] 2xl:h-[65vh] 2xl:max-w-7xl text-xs sm:text-sm z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.25)]
 p-4 sm:p-6 md:p-10 flex flex-col items-center justify-[safe_center] overflow-y-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
