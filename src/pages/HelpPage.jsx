import { BiHelpCircle } from "react-icons/bi";
import { FiSearch, FiSettings } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { RiTranslate } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-[90%] max-w-4xl h-[80vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        <h1 className="text-3xl font-bold text-amber-400 uppercase tracking-wide mb-6 mt-8">
          Help & Support
        </h1>

        <p className="text-white/90 leading-7 mb-6">
          This page provides an overview of the available functions in Linguify.
          The descriptions are intended to clarify how the individual modules
          operate and what they are designed for.
        </p>

        {/* TRANSLATOR */}
        <section className="mb-8">
          <div className="flex items-center">
            <RiTranslate size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Translator
            </h2>
          </div>

          <p className="text-white/90 leading-6 mb-2">
            The translation module allows text to be transferred from one
            language into another. It is intended for short to medium-length
            passages and focuses on a straightforward workflow.
          </p>

          <ul className="text-white/90 leading-6 list-disc pl-6">
            <li>Select a source and a target language.</li>
            <li>Enter the text into the upper or left input field.</li>
            <li>Start the translation using the central button.</li>
            <li>The result appears in the lower or right field.</li>
            <li>Languages can be switched at any time.</li>
            <li>
              Keyboard shortcuts:{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-black/10 text-sm">
                Cmd/Ctrl + Enter
              </kbd>{" "}
              to translate,{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-black/10 text-sm">
                Esc
              </kbd>{" "}
              to clear the input field.
            </li>
          </ul>
        </section>

        {/* SYNONYM FINDER */}
        <section className="mb-8">
          <div className="flex items-center">
            <FiSearch size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Synonym Finder
            </h2>
          </div>

          <p className="text-white/90 leading-6">
            This tool provides alternative wording suggestions for individual
            terms. It is primarily useful when revising text or searching for
            more precise or varied expressions.
          </p>
        </section>

        {/* SETTINGS */}
        <section className="mb-8">
          <div className="flex items-center">
            <FiSettings size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Settings
            </h2>
          </div>

          <p className="text-white/90 leading-6">
            The settings area contains options that influence how certain
            actions behave. These include automated clearing of input fields or
            automatic copying of translation results. Adjustments take effect
            immediately and are stored locally in the browser.
          </p>
        </section>

        {/* SUPPORT */}
        <section className="mb-8">
          <div className="flex items-center">
            <BiHelpCircle size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Additional Support
            </h2>
          </div>

          <p className="text-white/90 leading-6">
            If questions arise during use or if unexpected behaviour occurs,
            feedback can be submitted via the contact page. This information
            helps identify issues and supports further development of the
            application.
          </p>
        </section>

        <p className="text-center text-white/70 mt-16 text-sm pb-4">
          © {new Date().getFullYear()} Linguify — Support information.
        </p>
      </div>
    </div>
  );
}
