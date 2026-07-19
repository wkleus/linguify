import { MdClose, MdTranslate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TranslatorHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-10 md:-mb-15 lg:mb-0">
        <MdTranslate
          className="text-5xl text-yellow-50 hidden md:block"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))" }}
        />

        <h1
          className="uppercase font-semibold tracking-wide hidden md:block text-2xl md:text-3xl 3xl:text-4xl text-yellow-50  font-playful"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          Translator
        </h1>
      </div>

      <button className="close " onClick={() => navigate("/menu")}>
        <MdClose className=" sm:size-4 md:size-6" />
      </button>
    </>
  );
}
