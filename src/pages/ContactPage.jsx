import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration (Resend) coming soon
    setSent(true);
    setTimeout(() => setSent(false), 1500);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[90%] max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 flex flex-col gap-8"
      >
        <h1 className="uppercase font-bold text-3xl text-amber-400 tracking-wide text-center">
          Contact
        </h1>

        <button className="close" onClick={() => navigate("/menu")}>
          <MdClose size={30} />
        </button>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-white"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm opacity-80">Name</label>
            <input
              type="text"
              className="p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm opacity-80">Email</label>
            <input
              type="email"
              className="p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm opacity-80">Message</label>
            <textarea
              className="p-3 rounded-xl bg-white/10 border border-white/20 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-amber-600 text-lg text-white font-bold py-3 rounded-xl hover:scale-105 transition cursor-pointer"
            style={{ WebkitTextStroke: "0.2px rgba(0,0,0,0.1)" }}
          >
            Send Message
          </button>

          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-300 font-semibold text-lg"
            >
              Message sent!
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
}
