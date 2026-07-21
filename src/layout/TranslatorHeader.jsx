import { MdClose, MdTranslate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TranslatorHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-5 md:-mb-15 lg:mb-0 text-yellow-50/90">
        <MdTranslate
          className="text-4xl  hidden md:block"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.3))" }}
        />

        <h1
          className="uppercase font-semibold tracking-wide hidden md:block text-2xl md:text-[26px] 3xl:text-3xl font-playful"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          Translator
        </h1>
      </div>

      <button className="close" onClick={() => navigate("/menu")}>
        <MdClose className="size-4 sm:size-5" />
      </button>
    </>
  );
}
