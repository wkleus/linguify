// api/contact.js - Vercel Serverless Function
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Strips HTML tags and trims whitespace to prevent HTML injection.
const sanitize = (str) =>
  String(str)
    .replace(/<[^>]*>/g, "")
    .trim();

// Basic email format check – keeps obviously invalid addresses out
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    const { name, email, message } = req.body;

    // Validate required fields - check presence
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    // Sanitize first, then validate the cleaned values
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

    // send email with sanitized values
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: [process.env.RECIPIENT_EMAIL],
      replyTo: cleanEmail, // Sanitized
      subject: `LINGUIFY - New contact request from ${cleanName}`, // Sanitized
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

    // Success response
    res.status(200).json({
      success: true,
      message: "Email was successfully sent.",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Sending email failed.",
    });
  }
}
