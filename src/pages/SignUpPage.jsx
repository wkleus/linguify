import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import CirclePattern from "../components/CirclePattern";
import { IoMdPersonAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      alert("Check your email for confirmation link!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 bg-linear-to-r from-purple-700/90 via-red-800/90 to-purple-800/90"
    >
      {/* Decorative background pattern */}
      <CirclePattern className="absolute inset-0 w-full h-full" />

      <div className="max-w-md w-full rounded-2xl shadow-xl p-8 bg-white/80 backdrop-blur-2xl border-2 border-blue-800/90">
        <div className="flex flex-col justify-center items-center gap-3 text-blue-800/90">
          <IoMdPersonAdd className="text-5xl font-bold text-center" />
          <h1 className="text-3xl font-bold text-center mb-8">
            Create Account
          </h1>
        </div>

        <button
          className="close border-blue-800/50! p-1! top-1! right-1!"
          onClick={() => navigate("/menu")}
        >
          <MdClose className="size-3 sm:size-4 text-blue-800" />
        </button>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-700/80 text-sm font-semibold tracking-wide text-center bg-red-900/5 p-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800/90 hover:bg-blue-700 cursor-pointer disabled:opacity-70 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
