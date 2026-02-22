/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        indigo: { 600: "#4f46e5" },
        fuchsia: { 500: "#d946ef" },
        pink: { 600: "#db2777" },
      },
      fontFamily: {
        bitcount: ["Bitcount Single", "sans-serif"],
        caveat: ["Caveat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        noto: ["Noto Sans JP", "sans-serif"],
        playpen: ["Playpen Sans", "sans-serif"],
        headline: ["Playpen Sans", "sans-serif"],
        body: ["Noto Sans JP", "sans-serif"],
        accent: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
