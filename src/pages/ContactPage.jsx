import { motion } from "framer-motion";
import { MdClose, MdMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatWaitTime } from "../utils/formatWaitTime";
import IsometricPattern from "../components/IsometricPattern";

export default function ContactPage() {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for form submission status
  const [status, setStatus] = useState({
    loading: false, // Indicates if form is being submitted
    sent: false, // Indicates if message was sent successfully
    error: null, // Stores error message if any
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, sent: false, error: null }); // Reset status

    try {
      // CAll backend API / Send form data to backend API
      // IMPORTANT: With Vite, environment variables must start with VITE_ to be available in the frontend!
      // Determine the API URL based on the environment
      // If on Vercel (production/preview), use relative URL, if local, use localhost:3000
      const isProduction = import.meta.env.PROD;
      const apiUrl = isProduction
        ? "/api/contact" // on Vercel full path: /api/contact
        : import.meta.env.VITE_API_URL || "http://localhost:3000"; // local

      const response = await fetch(
        isProduction ? apiUrl : `${apiUrl}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          const wait = formatWaitTime(errorData.reset);
          throw new Error(
            wait
              ? `Too many requests – please wait ${wait} before trying again.`
              : errorData.error ||
                  "Too many requests – please try again later.",
          );
        }
        throw new Error(errorData.error || "Failed to send message");
      }

      // Update status on success
      setStatus({ loading: false, sent: true, error: null });
      setFormData({ name: "", email: "", message: "" }); // Clear form

      // Hide success message after 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, sent: false }));
      }, 3000);
    } catch (error) {
      // Update status on error
      setStatus({
        loading: false,
        sent: false,
        error:
          error.message || "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative background pattern */}
      <IsometricPattern className="absolute inset-0 w-full h-full" />

      {/* Animated card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[85%] max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] p-6 sm:p-8 flex flex-col gap-5 sm:gap-6"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3  text-yellow-100/80">
            <MdMailOutline
              className=" text-4xl  hidden md:block"
              style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.3))" }}
            />
            <h1
              className="sm:text-3xl uppercase font-semibold tracking-wide hidden md:block text-2xl md:text-2xl 3xl:text-3xl font-playful"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              Contact
            </h1>
          </div>
          <button
            className="close"
            onClick={() => navigate("/menu")}
            aria-label="Close"
          >
            <MdClose className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Animated form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-white"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1.5 text-sm opacity-80 font-medium"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="p-3 sm:p-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring text-sm focus:ring-gray-300/70 focus:border-transparent transition"
              placeholder="Your name..."
              required
              disabled={status.loading} // Disable input while loading
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1.5 text-sm opacity-80 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 sm:p-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-1 text-sm focus:ring-gray-300/70 focus:border-transparent transition"
              placeholder="your@email.com..."
              required
              disabled={status.loading} // Disable input while loading
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="mb-1.5 text-sm opacity-80 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 sm:p-2 rounded-xl bg-white/10 border border-white/20 min-h-30 focus:outline-none focus:ring-1 text-sm focus:ring-gray-300/70  focus:border-transparent transition resize-y"
              placeholder="Your message..."
              required
              disabled={status.loading} // Disable textarea while loading
            />
          </div>

          <motion.button
            type="submit"
            className="submit border border-white/20  tracking-wide text-sm sm:text-base text-yellow-100/90 font-semibold py-2 rounded-xl  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-white/3"
            disabled={status.loading} // Disable button while loading
          >
            {status.loading ? "Sending..." : "Send Message"}
          </motion.button>

          {/* Success message */}
          {status.sent && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-200 font-light text-sm bg-green-600/30 py-2 rounded-lg"
            >
              ✓ Message sent successfully!
            </motion.div>
          )}

          {/* Error message */}
          {status.error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-200 font-light text-sm bg-red-900/30 py-2 rounded-lg"
            >
              ⚠ {status.error}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
}
