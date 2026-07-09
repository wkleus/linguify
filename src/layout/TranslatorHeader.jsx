import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TranslatorHeader() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="uppercase font-bold text-3xl text-amber-400 tracking-wide -mt-10 hidden md:block ">
        Translator
      </h1>
      <button className="close " onClick={() => navigate("/menu")}>
        <MdClose className=" sm:size-4 md:size-6" />
      </button>
    </>
  );
}
