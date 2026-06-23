import { motion } from "framer-motion";

export default function TranslatorLayout({ children }) {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-[95%] max-w-6xl h-[90vh] md:h-[75vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 flex flex-col items-center justify-center overflow-y-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
g;
