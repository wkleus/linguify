import { Component } from "react";
import { motion } from "framer-motion";

// Catches JavaScript errors thrown during rendering and shows fallback UI instead of white screen
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Trigger fallback UI on next render
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for debugging
    console.error("Uncaught render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-10 flex flex-col items-center gap-6"
          >
            <p className="text-6xl">⚠️</p>
            <h1 className="text-2xl font-bold text-white text-center">
              Something went wrong
            </h1>
            <p className="text-white/70 text-center leading-7">
              Unexpected error occurred - reloading the page usually fixes this.
            </p>
            <button
              onClick={() => window.location.assign("/menu")}
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition cursor-pointer"
            >
              Reload App
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
