import { motion } from "framer-motion";
import { BiHelpCircle } from "react-icons/bi";
import { HiSpeakerWave } from "react-icons/hi2";
import { FiSearch, FiSettings } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { RiTranslate } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function HelpPage() {
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
          Help & Support
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-white/90 leading-6 mb-6 text-sm sm:text-base"
        >
          An overview of all available features in Linguify and how to use them.
        </motion.p>

        {/* Translator */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <RiTranslate size={24} className="mr-3 text-amber-500" />
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Translator
            </h2>
          </div>
          <p className="text-white/90 leading-6 mb-2 text-sm sm:text-base">
            Translates text between supported languages with a minimal, focused
            interface.
          </p>
          <ul className="text-white/90 leading-6 list-disc pl-6 text-sm sm:text-base">
            <li>Select a source and a target language.</li>
            <li>Enter text into the input field.</li>
            <li>Press the central button or use a keyboard shortcut.</li>
            <li>The result appears in the output field.</li>
            <li>Languages can be switched at any time.</li>
            <li>
              Shortcuts:{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-black/20 text-sm">
                Cmd/Ctrl + Enter
              </kbd>{" "}
              to translate,{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-black/20 text-sm">
                Esc
              </kbd>{" "}
              to clear.
            </li>
          </ul>
        </motion.section>

        {/* Text-to-Speech */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <HiSpeakerWave size={24} className="mr-3 text-amber-500" />
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Text‑to‑Speech
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            Both the input and output fields have a speaker button (top left).
            Click it to hear the text read aloud in the selected language. Click
            again to stop. Uses the browser's built‑in Speech API — no
            additional software required.
          </p>
        </motion.section>

        {/* Synonym Finder */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <FiSearch size={24} className="mr-3 text-amber-500" />
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Synonym Finder
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            Provides alternative wording suggestions for individual terms —
            useful when revising text or looking for more precise expressions.
          </p>
        </motion.section>

        {/* Settings */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <FiSettings size={24} className="mr-3 text-amber-500" />
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Settings
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            Customize automated behavior: auto‑clear the input field after
            translation, or auto‑copy the result to the clipboard. Changes take
            effect immediately and are stored locally in the browser.
          </p>
        </motion.section>

        {/* Support */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <BiHelpCircle size={24} className="mr-3 text-amber-500" />
            <h2 className="text-[17px] sm:text-xl font-semibold text-amber-400">
              Additional Support
            </h2>
          </div>
          <p className="text-white/90 leading-6 text-sm sm:text-base">
            If something behaves unexpectedly or you have suggestions for
            improvement, use the{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-amber-400 hover:text-amber-300 underline transition-colors font-medium cursor-pointer"
            >
              contact page
            </button>{" "}
            to send feedback. Messages are delivered via{" "}
            <strong className="text-amber-400">Resend</strong> email API. This
            helps identify issues and guides future development.
          </p>
        </motion.section>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="text-center text-white/70 mt-16 text-sm pb-4"
        >
          © {new Date().getFullYear()} Linguify — Support information.
        </motion.p>
      </motion.div>
    </div>
  );
}
