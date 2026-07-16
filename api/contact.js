import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { sendContactEmail } from "../shared/contactService.js";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Redis for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate Limiter: 2 requests per 5 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "5 m"),
  analytics: true,
  prefix: "ratelimit:contact", // separate from improve limite
});

/**
 * Vercel Serverless Function handler
 * Handles POST requests to /api/contact
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Rate limit check
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        error:
          "Too many requests – please wait a few minutes before trying again.",
        limit,
        remaining,
        reset: new Date(reset).toISOString(),
      });
    }

    const { name, email, message } = req.body;

    // delegate validation, sanitization and sending to shared service
    const { status, body } = await sendContactEmail({
      resend,
      senderEmail: process.env.SENDER_EMAIL,
      recipientEmail: process.env.RECIPIENT_EMAIL,
      fields: { name, email, message },
    });

    return res.status(status).json(body);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Sending email failed.",
    });
  }
}
