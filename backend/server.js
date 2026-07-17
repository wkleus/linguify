// local Express server for development
// use shared services for contact email and translation improvement
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { sendContactEmail } = require("../shared/contactService.js");
const { improveTranslation } = require("../shared/deepseekService.js");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for local development
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

// rate limiter: 2 requests per 5 minutes for contact form
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 2,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  // include a `reset` timestamp in the body, same shape the frontend
  // already expects from the Upstash-based Vercel route
  handler: (req, res) => {
    const resetSeconds = Number(res.getHeader("RateLimit-Reset")) || 0;
    res.status(429).json({
      error:
        "Too many requests – please wait a few minutes before trying again.",
      reset: new Date(Date.now() + resetSeconds * 1000).toISOString(),
    });
  },
});

app.use("/api/contact", limiter);

// rate limiter: 10 requests per 5 minutes for improve endpoint
const improveLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  handler: (req, res) => {
    const resetSeconds = Number(res.getHeader("RateLimit-Reset")) || 0;
    res.status(429).json({
      error:
        "Too many requests – please wait a few minutes before trying again.",
      reset: new Date(Date.now() + resetSeconds * 1000).toISOString(),
    });
  },
});

app.use("/api/improve", improveLimiter);

// verify environment variables
console.log(
  "✅ RESEND_API_KEY:",
  process.env.RESEND_API_KEY ? "Loaded successfully" : "❌ Failure.",
);
console.log("✅ SENDER_EMAIL:", process.env.SENDER_EMAIL || "❌ Failure");
console.log("✅ RECIPIENT_EMAIL:", process.env.RECIPIENT_EMAIL || "❌ Failure");
console.log(
  "✅ DEEPSEEK_API_KEY:",
  process.env.DEEPSEEK_API_KEY ? "Loaded successfully" : "❌ Failure.",
);

const resend = new Resend(process.env.RESEND_API_KEY);

// contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    const { status, body } = await sendContactEmail({
      resend,
      senderEmail: process.env.SENDER_EMAIL,
      recipientEmail: process.env.RECIPIENT_EMAIL,
      fields: { name, email, message },
    });

    res.status(status).json(body);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Sending email failed.",
    });
  }
});

// translation improvement endpoint
app.post("/api/improve", async (req, res) => {
  try {
    const { sourceText, translatedText, sourceLang, targetLang, instruction } =
      req.body || {};

    const { status, body } = await improveTranslation({
      apiKey: process.env.DEEPSEEK_API_KEY,
      sourceText,
      translatedText,
      sourceLang,
      targetLang,
      instruction,
    });

    res.status(status).json(body);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Improving translation failed.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Rate Limiter: 2 requests per 5 minutes`);
});
