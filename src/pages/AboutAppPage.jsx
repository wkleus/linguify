import { FaFlagCheckered } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { GiCrystalBall } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AboutAppPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-[90%] max-w-4xl h-[80vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        <h1 className="text-3xl font-bold text-amber-400 uppercase tracking-wide mb-6 mt-8">
          About Linguify
        </h1>

        {/* INTRO */}
        <p className="text-white/90 leading-7 mb-6">
          Linguify is a web‑based tool designed to support users in working with
          multilingual text. The application provides translation functions,
          synonym lookup and several auxiliary features that simplify recurring
          language‑related tasks. The focus lies on a clear interface and
          straightforward operation without requiring additional software.
        </p>

        {/* PURPOSE */}
        <div className="mb-8">
          <div className="flex items-center">
            <FaFlagCheckered size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Purpose and Scope
            </h2>
          </div>
          <p className="text-white/90 leading-6">
            The application is intended for users who regularly work with text
            in different languages — for example when writing, learning or
            reviewing content. Linguify aims to reduce manual steps and make
            frequently needed tools accessible in a single interface.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mb-8">
          <div className="flex items-center">
            <HiSparkles size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Functional Overview
            </h2>
          </div>

          <ul className="text-white/90 leading-6 list-disc pl-6">
            <li>
              <span className="font-semibold">Translation: </span>
              Provides direct text translation between supported languages. The
              interface is intentionally minimal to keep the workflow focused.
            </li>

            <li>
              <span className="font-semibold">Synonym Finder: </span>
              Offers alternative wording suggestions for individual terms, which
              can assist in writing or revising text.
            </li>

            <li>
              <span className="font-semibold">Settings: </span>
              Includes options for automating certain actions, such as clearing
              input fields or copying results automatically.
            </li>

            <li>
              <span className="font-semibold">Help & Contact: </span>
              Provides usage information and a way to submit feedback.
            </li>
          </ul>
        </div>

        {/* TECHNOLOGY */}
        <div className="mb-8">
          <div className="flex items-center">
            <FiZap size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Technical Basis
            </h2>
          </div>
          <p className="text-white/90 leading-6">
            Linguify is built using React and TailwindCSS. Translation and
            synonym data are retrieved from external APIs, allowing the
            application to remain lightweight while relying on established
            language resources. The interface is responsive and can be used on
            both desktop and mobile devices.
          </p>
        </div>

        {/* FUTURE */}
        <div className="mb-8">
          <div className="flex items-center">
            <GiCrystalBall size={28} className="mr-3 text-amber-500" />
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Planned Development
            </h2>
          </div>
          <p className="text-white/90 leading-6">
            Future updates may include additional language tools, extended
            customization options and improvements in usability and
            accessibility. Development priorities are based on practical use
            cases and user feedback.
          </p>
        </div>

        {/* FOOTER */}
        <p className="text-center text-white/70 mt-16 text-sm pb-4">
          © {new Date().getFullYear()} Linguify — A compact toolkit for
          language‑related tasks.
        </p>
      </div>
    </div>
  );
}
