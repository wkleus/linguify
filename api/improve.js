import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { improveTranslation } from "../shared/deepseekService.js";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// rate limit: 10 requests per 5 minutes per IP to prevent quota exhaustion
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "5 m"),
  analytics: true,
  prefix: "ratelimit:improve", // separate from contact form limiter
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // get client IP from proxy headers or fallback to socket address
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

    const { sourceText, translatedText, sourceLang, targetLang, instruction } =
      req.body || {};

    // delegate all DeepSeek logic to shared service
    const { status, body } = await improveTranslation({
      apiKey: process.env.DEEPSEEK_API_KEY,
      sourceText,
      translatedText,
      sourceLang,
      targetLang,
      instruction,
    });

    return res.status(status).json(body);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Improving translation failed." });
  }
}
