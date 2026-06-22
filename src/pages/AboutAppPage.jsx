import { motion } from "framer-motion";
import { FaFlagCheckered } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { GiCrystalBall } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function AboutAppPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[90%] max-w-4xl h-[80vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 overflow-y-auto"
      >
        {/* Close button */}
        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-3xl font-bold text-amber-400 uppercase tracking-wide mb-6 mt-8"
        >
          About Linguify
        </motion.h1>

        {/* Intro */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-white/90 leading-7 mb-6"
        >
          Linguify is a web‑based tool designed to support users in working with
          multilingual text. It provides translation, synonym lookup, and
          text‑to‑speech playback in a single, minimal interface — no additional
          software required.
        </motion.p>

        {/* Purpose */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <FaFlagCheckered size={24} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400">
              Purpose and Scope
            </h2>
          </div>
          <p className="text-white/90 leading-6">
            Built for users who regularly work with text in different languages
            — whether writing, learning, or reviewing content. Linguify reduces
            manual steps and keeps frequently needed tools in one place.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <HiSparkles size={24} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400">
              Functional Overview
            </h2>
          </div>
          <ul className="text-white/90 leading-7 list-disc pl-6">
            <li>
              <span className="font-semibold">Translation — </span>
              Direct text translation between 20 languages with keyboard
              shortcuts (Cmd/Ctrl + Enter to translate, Esc to clear).
            </li>
            <li>
              <span className="font-semibold">Text‑to‑Speech — </span>
              Plays back input and output text aloud in the correct language via
              the browser's built‑in Speech API.
            </li>
            <li>
              <span className="font-semibold">Synonym Finder — </span>
              Alternative wording suggestions for individual terms, useful for
              writing and revision.
            </li>
            <li>
              <span className="font-semibold">Settings — </span>
              Auto‑save options for clearing input or copying results
              automatically after each translation.
            </li>
            <li>
              <span className="font-semibold">Help & Contact — </span>
              Usage instructions and a way to submit feedback.
            </li>
          </ul>
        </motion.div>

        {/* Technology */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <FiZap size={24} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400">
              Technical Basis
            </h2>
          </div>
          <p className="text-white/90 leading-6">
            Built with React, Tailwind CSS, Framer Motion, and custom hooks for
            clean separation of logic and UI. Translation and synonym data come
            from external APIs (MyMemory, Datamuse). Text‑to‑speech uses the
            browser's native Web Speech API — no backend required.
          </p>
        </motion.div>

        {/* Future */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <GiCrystalBall size={24} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400">
              Planned Development
            </h2>
          </div>
          <p className="text-white/90 leading-6">
            Upcoming updates may include a contact form backend (Resend),
            extended language support, and further accessibility improvements.
            Priorities are based on practical use cases and user feedback.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="text-center text-white/70 mt-16 text-sm pb-4"
        >
          © {new Date().getFullYear()} Linguify — A compact toolkit for
          language‑related tasks.
        </motion.p>
      </motion.div>
    </div>
  );
}
