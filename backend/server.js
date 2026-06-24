const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

/* Middleware */

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 2, // Max 2 requests per IP
  message: {
    error: "Too many requests – please wait a few minutes before trying again.",
  },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,

  // Debug: show when Rate limit reached
  onLimitReached: (req, res) => {
    console.log(`Rate limit reached for IP: ${req.ip}`);
  },
  // Debug: show the IP
  keyGenerator: (req) => {
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    console.log(`Request from IP: ${ip}`);
    return ip;
  },
});

// Apply rate limiter to /api/contact endpoint
app.use("/api/contact", limiter);

// Debug
console.log(
  "✅ RESEND_API_KEY:",
  process.env.RESEND_API_KEY ? "Loaded successfully" : "❌ Failure.",
);
console.log("✅ SENDER_EMAIL:", process.env.SENDER_EMAIL || "❌ Failure");
console.log("✅ RECIPIENT_EMAIL:", process.env.RECIPIENT_EMAIL || "❌ Failure");

// Sanitize
const sanitize = (str) =>
  String(str)
    .replace(/<[^>]*>/g, "")
    .trim();

// Email validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// POST route for the contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    // Sanitize
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);

    // Check if fields are empty after sanitization
    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        error: "Fields cannot be empty or contain only HTML tags.",
      });
    }

    // Email format check
    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Send email with sanitized values
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: [process.env.RECIPIENT_EMAIL],
      replyTo: cleanEmail,
      subject: `LINGUIFY - New contact request from ${cleanName}`,
      html: `
        <h1>LINGUIFY</h1>  
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      message: "Email was successfully sent.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Sending email failed.",
    });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Rate Limiter: ${2} requests per ${5} minutes`);
});
