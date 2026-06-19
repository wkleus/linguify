import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 flex flex-col items-center gap-6">
        {/* CLOSE BUTTON */}
        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        {/* 404 */}
        <p className="text-8xl font-bold text-amber-400">404</p>

        <h1 className="text-2xl font-bold text-white text-center">
          Page not found
        </h1>

        <p className="text-white/70 text-center leading-7">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/menu")}
          className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}
