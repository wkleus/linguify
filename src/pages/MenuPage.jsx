import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaEnvelope,
  FaInfoCircle,
  FaSearch,
  FaQuestionCircle,
  FaLanguage,
  FaCog,
  FaCompass,
} from "react-icons/fa";

// Multilingual background characters
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
    top: "72%",
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
    top: "50%",
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
    top: "25%",
    left: "50%",
    size: "1.6rem",
    duration: "8s",
    delay: "-2s",
  },
  {
    char: "ü",
    top: "48%",
    left: "80%",
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

const menuItems = [
  {
    title: "Home",
    path: "/",
    pos: { top: "47%", left: "55%" },
    icon: FaHome,
    color: "#FFAB6B",
  },
  {
    title: "Contact",
    path: "/contact",
    pos: { top: "20%", left: "12%" },
    icon: FaEnvelope,
    color: "#4ECDC4",
  },
  {
    title: "About App",
    path: "/about-app",
    pos: { top: "55%", left: "12%" },
    icon: FaInfoCircle,
    color: "#45B7D1",
  },
  {
    title: "Synonym Finder",
    path: "/synonym-finder",
    pos: { top: "35%", left: "27%" },
    icon: FaSearch,
    color: "#96CEB4",
  },
  {
    title: "Help",
    path: "/help",
    pos: { top: "76%", left: "42%" },
    icon: FaQuestionCircle,
    color: "#FFEAA7",
  },
  {
    title: "Translator",
    path: "/translator",
    pos: { top: "25%", left: "63%" },
    icon: FaLanguage,
    color: "#96C9B4",
  },
  {
    title: "Settings",
    path: "/settings",
    pos: { top: "65%", left: "68%" },
    icon: FaCog,
    color: "#FFbA5C",
  },
];

// Each button flies in from a different direction
const getRandomDirection = (index) => {
  const directions = [
    { x: -100, y: -100 },
    { x: 100, y: -100 },
    { x: -100, y: 100 },
    { x: 100, y: 100 },
    { x: 0, y: -120 },
    { x: 0, y: 120 },
    { x: -120, y: 0 },
    { x: 120, y: 0 },
  ];
  return directions[index % directions.length];
};

// Deterministic per-index tilt for the fly-in animation - using index instead of Math.random() keeps rendering pure
const getInitialRotation = (index) => ((index * 37) % 20) - 10;
export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-[92%] max-w-6xl h-[75vh] rounded-3xl p-8 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
          border: "2px solid rgba(255,255,255,0.2)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        {/* Drifting multilingual decorative letters */}
        {BACKGROUND_CHARACTERS.map((item, index) => {
          // Generate random offset for each character
          const randomOffset = ((index * 7) % 15) + 5;

          return (
            <motion.span
              key={index}
              aria-hidden="true"
              className="absolute text-white/20 font-bold select-none pointer-events-none"
              style={{
                top: item.top,
                left: item.left,
                fontSize: item.size,
              }}
              animate={{
                y: [0, -randomOffset - 5, 0, randomOffset + 5, 0],
                x: [0, randomOffset, 0, -randomOffset, 0],
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1, 0.95, 1],
              }}
              transition={{
                duration: parseFloat(item.duration),
                delay: parseFloat(item.delay) * -1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {item.char}
            </motion.span>
          );
        })}

        {/* Decorative background blurs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full blur-3xl" />
        </div>

        {/* Animated title with compass icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8 mt-0 md:mt-5 relative z-10"
        >
          <FaCompass
            className="text-4xl text-yellow-100 opacity-80"
            style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.2))" }}
          />
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-100 opacity-80"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
          >
            Navigation
          </h1>
        </motion.div>

        {/* Menu buttons */}
        {menuItems.map((item, index) => {
          const direction = getRandomDirection(index);
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="absolute -translate-x-1/8 -translate-y-1/15 md:px-[1.2rem] md:py-[0.6rem] px-[0.6rem] py-[0.3rem] bg-white/10 border border-white/25 rounded-xl text-white font-semibold cursor-pointer shadow-md backdrop-blur-md tracking-wide z-10 flex items-center gap-2 text-[clamp(0.9rem,1.2vw,1.2rem)]"
              style={item.pos}
              initial={{
                opacity: 0,
                scale: 0.3,
                x: direction.x,
                y: direction.y,
                rotate:  getInitialRotation(index),
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.1 + index * 0.07,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                scale: 1.03,
                background: "rgba(255,255,255,0.25)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 },
              }}
            >
              <Icon
                className="text-lg"
                style={{
                  color: item.color,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
              <span className="relative z-10">{item.title}</span>
              {/* Glow effect on hover */}
              <span
                className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${item.color}30 0%, transparent 70%)`,
                }}
              />
            </motion.button>
          );
        })}

        {/* Decorative floating dots */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-40 z-10" />
        <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full opacity-30 z-10" />
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full opacity-40 z-10" />
        <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-white rounded-full opacity-30 z-10" />
      </motion.div>
    </div>
  );
}
