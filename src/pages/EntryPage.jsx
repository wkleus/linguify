import React from "react";
import { useNavigate } from "react-router-dom";

export default function LinguifyEntry() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
      {/* Headline */}
      <h1 className="font-semibold text-6xl mb-4 drop-shadow-[0_0_18px_rgba(0,0,0,0.45)]">
        Welcome to{" "}
        <span className="relative inline-block">
          <span
            className="absolute inset-0 text-transparent"
            style={{
              WebkitTextStroke: "2px rgba(0,0,0,0.55)",
              transform: "translate(3px, 3px)",
              opacity: 0.7,
            }}
          >
            Linguify
          </span>

          <span
            className="absolute inset-0 text-transparent"
            style={{ WebkitTextStroke: "2px white" }}
          >
            Linguify
          </span>

          <span className="relative bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,0,0,0.35)]">
            Linguify
          </span>
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
      <p className="font-semibold text-xl text-white max-w-xl mb-8 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
        Discover languages in a new, creative, and intuitive way. Learning has
        never felt this alive.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/menu")}
        className="text-kg tracking-wide bg-orange-300/40
     text-white text-lg opacity-85 font-semibold shadow-xl hover:scale-110 hover:opacity-100 transition-all duration-500 ease-in-out rounded-full cursor-pointer border-2 px-3 py-2 -mt-3 "
      >
        Start now
      </button>
    </div>
  );
}
