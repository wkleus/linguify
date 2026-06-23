const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

/* Middleware */
// CORS with specific frontend URL
app.use(
  cors({
    origin: "http://localhost:5173", // Vite Frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

// Debug: Check if the enviroments variables are loaded
console.log(
  "✅ RESEND_API_KEY:",
  process.env.RESEND_API_KEY ? "Loaded successfully" : "❌ Failure.",
);
console.log("✅ SENDER_EMAIL:", process.env.SENDER_EMAIL || "❌ Failure");
console.log("✅ RECIPIENT_EMAIL:", process.env.RECIPIENT_EMAIL || "❌ Failure");

// initialisize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// POST route for the contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // validate
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    // send email
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
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
});
