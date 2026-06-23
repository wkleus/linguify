// api/contact.js - Vercel Serverless Function
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: [process.env.RECIPIENT_EMAIL],
      replyTo: email,
      subject: `LINGUIFY - New contact request from ${name}`,
      html: `
        <h1>LINGUIFY</h1>    
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
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
