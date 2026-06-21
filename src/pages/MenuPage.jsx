import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function MenuPage() {
  const navigate = useNavigate();

  // Every position is deliberately set “wild”
  const menuItems = [
    {
      title: "Home",
      path: "/",
      pos: { top: "47%", left: "55%" },
    },
    {
      title: "Contact",
      path: "/contact",
      pos: { top: "18%", left: "12%" },
    },
    {
      title: "About App",
      path: "/about-app",
      pos: { top: "55%", left: "10%" },
    },
    {
      title: "Synonym Finder",
      path: "/synonym-finder",
      pos: { top: "35%", left: "27%" },
    },
    {
      title: "Help",
      path: "/help",
      pos: { top: "76%", left: "42%" },
    },
    {
      title: "Translator",
      path: "/translator",
      pos: { top: "24%", left: "65%" },
    },
    { title: "Settings", path: "/settings", pos: { top: "65%", left: "70%" } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4"
    >
      <div className="relative w-[90%] max-w-5xl h-[70vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 overflow-hidden">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            style={item.pos}
            className="absolute bg-white/0 backdrop-blur-xl border border-white/20 rounded-2xl py-1.5 px-3 cursor-pointer text-white text-xl font-semibold shadow-xl hover:scale-110 hover:bg-white/20 transition-all duration-300"
          >
            {item.title}
          </button>
        ))}

        <svg
          className="lightning-zigzag"
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
        >
          <polyline
            points="20,0 80,150 40,300 120,450 60,600 140,800"
            stroke="rgba(255, 160, 60, 0.7)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
