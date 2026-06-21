import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { motion } from "framer-motion";

// Multilingual background characters with organic scatter
const BACKGROUND_CHARACTERS = [
  {
    char: "A",
    top: "9%",
    left: "12%",
    size: "2rem",
    duration: "9s",
    delay: "0s",
  },
  {
    char: "あ",
    top: "78%",
    left: "22%",
    size: "4.5rem",
    duration: "11s",
    delay: "-3s",
  },
  {
    char: "А",
    top: "15%",
    left: "78%",
    size: "1.8rem",
    duration: "8s",
    delay: "-5s",
  },
  {
    char: "أ",
    top: "62%",
    left: "85%",
    size: "3.8rem",
    duration: "10s",
    delay: "-1s",
  },
  {
    char: "中",
    top: "88%",
    left: "55%",
    size: "2.5rem",
    duration: "12s",
    delay: "-7s",
  },
  {
    char: "ñ",
    top: "4%",
    left: "38%",
    size: "3.2rem",
    duration: "9s",
    delay: "-4s",
  },
  {
    char: "한",
    top: "35%",
    left: "10%",
    size: "4rem",
    duration: "10s",
    delay: "-6s",
  },
  {
    char: "Ω",
    top: "52%",
    left: "88%",
    size: "1.6rem",
    duration: "8s",
    delay: "-2s",
  },
  {
    char: "ü",
    top: "28%",
    left: "60%",
    size: "2.3rem",
    duration: "10.5s",
    delay: "-8s",
  },
  {
    char: "字",
    top: "70%",
    left: "40%",
    size: "1.8rem",
    duration: "9.5s",
    delay: "-2.5s",
  },
];

export default function LinguifyEntry() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center w-full h-full p-10 text-center overflow-hidden"
    >
      {/* Drifting multilingual decorative letters */}
      {BACKGROUND_CHARACTERS.map((item, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="animate-char-drift absolute text-white/20 font-bold select-none pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.size,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        >
          {item.char}
        </span>
      ))}

      {/* Headline */}
      <h1 className="font-semibold text-7xl mb-1 drop-shadow-[0_0_18px_rgba(0,0,0,0.45)]">
        Welcome to{" "}
        <span className="animate-logo-glow font-playful bg-gradient-to-r from-pink-500  via-cyan-500 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,0,0,0.35)]">
          Linguify
        </span>
      </h1>

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

      {/* Claim */}
      <p className="font-handwritten text-3xl text-white max-w-xl mb-8 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
        Discover languages in a new, creative, and intuitive way.
      </p>

      {/* CTA Button */}
      <div className="mt-2">
        <button
          onClick={() => navigate("/menu")}
          className="group tracking-wide bg-white/10 backdrop-blur-xl text-white text-lg font-semibold shadow-xl hover:bg-white/20 transition-all duration-300 rounded-full cursor-pointer border border-white/20 px-6 py-2 flex items-center justify-center gap-0 hover:gap-2"
        >
          Start now
          <HiArrowRight className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300" />
        </button>
      </div>
    </motion.div>
  );
}
