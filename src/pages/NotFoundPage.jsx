import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 flex flex-col items-center gap-6"
      >
        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-8xl font-bold text-amber-400"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-bold text-white text-center"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 text-center leading-7"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => navigate("/menu")}
          className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition cursor-pointer"
        >
          Back to Menu
        </motion.button>
      </motion.div>
    </div>
  );
}
