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
          <MdClose className="size-3 sm:size-6 " />
        </button>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-2xl sm:text-3xl font-bold text-amber-400 uppercase tracking-wide mb-6 mt-8"
        >
          About Linguify
        </motion.h1>

        {/* Intro */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-white/90 leading-6 text-sm sm:text-base mb-6"
        >
          Linguify is a fullstack web application for multilingual text work. It
          offers translation, AI-powered post-editing with DeepSeek,
          text-to-speech, synonym lookup and an AI Studio in a clean, responsive
          interface.
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
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Purpose and Scope
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            Designed for translators, language learners, writers and content
            reviewers. Linguify combines classic tools with modern AI to deliver
            higher quality results faster.
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
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Key Features
            </h2>
          </div>
          <ul className="text-white/90 leading-7 list-disc pl-6 text-sm sm:text-base">
            <li>
              <span className="font-semibold">
                Translation + AI Post-Editing —{" "}
              </span>
              MyMemory translation with powerful{" "}
              <strong>AI Post-Editing via AI Studio</strong> powered by{" "}
              <strong>DeepSeek v4 Flash</strong> for contextual improvements,
              terminology and style.
            </li>
            <li>
              <span className="font-semibold">AI Studio — </span>
              Quick actions and custom instructions to refine translations (e.g.
              "make more formal", "back-translate", "simplify" etc.).
            </li>
            <li>
              <span className="font-semibold">Text‑to‑Speech — </span>
              Browser-native Web Speech API with independent controls and CJK
              font optimization.
            </li>
            <li>
              <span className="font-semibold">Synonym Finder — </span>
              Datamuse-powered suggestions for better wording.
            </li>
            <li>
              <span className="font-semibold">Smart Settings &amp; UX — </span>
              Auto-clear, auto-copy, <strong>live translation</strong>{" "}
              (debounced, opt-in), live character counter, keyboard shortcuts,
              Framer Motion animations, persisted settings.
            </li>
            <li>
              <span className="font-semibold">Contact Form — </span>
              Secure delivery via Resend with rate limiting (Upstash Redis).
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
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Technical Basis
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            Built with React, Tailwind CSS, Framer Motion, and custom hooks for
            clean separation of logic and UI — including a custom{" "}
            <strong>useDebounce</strong> hook that powers live translation by
            delaying API calls until typing pauses. Translation and synonym data
            come from external APIs (MyMemory, Datamuse). Text‑to‑speech uses
            the browser's native Web Speech API. AI post-editing runs via
            DeepSeek (OpenAI-compatible) through Vercel Serverless Functions.
            All settings are persisted locally. Robust rate limiting protects
            the AI quota.
            <br />
            <br />
            The contact form uses{" "}
            <strong className="text-amber-400">Resend</strong> for email
            delivery, with an Express backend for local development and Vercel
            serverless functions for production deployment.
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
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Planned Development
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            Upcoming updates may include further AI Studio enhancements,
            extended language support, user accounts, translation history and
            further accessibility improvements.
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
          © {new Date().getFullYear()} Linguify — AI-enhanced multilingual
          toolkit
        </motion.p>
      </motion.div>
    </div>
  );
}
