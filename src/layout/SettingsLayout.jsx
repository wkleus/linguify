import { motion } from "framer-motion";
import TrianglePattern from "../components/TrianglePattern";

export default function SettingsLayout({ children }) {
  return (
    <div className="w-full h-screen bg-linear-to-r from-blue-600/90 via-indigo-600/90 to-cyan-600/90 flex items-center justify-center p-4">
      {/* Decorative background pattern -> covers full page */}
      <TrianglePattern className="absolute inset-0 w-full h-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[90%] max-w-3xl max-h-[75vh] overflow-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] pt-10 pb-10 px-10 flex flex-col gap-8 "
      >
        {children}
      </motion.div>
    </div>
  );
}
