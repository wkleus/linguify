// shared/contactService.js - Validates, sanitizes, and sends contact form emails
// used by both Vercel API and local dev server, returns framework-agnostic {status, body}

const {
  validateContactFields,
  sanitizeContactFields,
  nl2br,
} = require("./contactSanitize.js");

function buildEmailHtml({ name, email, message }) {
  return `
    <h1>LINGUIFY</h1>
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${nl2br(message)}</p>
  `;
}

/**
 * validates, sanitizes, and sends contact email
 * @returns {Promise<{status: number, body: object}>} framework-agnostic result
 */
async function sendContactEmail({
  resend,
  senderEmail,
  recipientEmail,
  fields,
}) {
  const errors = validateContactFields(fields);
  if (errors.length > 0) {
    return { status: 400, body: { error: errors[0], errors } };
  }

  const clean = sanitizeContactFields(fields);

  let data, error;
  try {
    ({ data, error } = await resend.emails.send({
      from: senderEmail || "onboarding@resend.dev",
      to: [recipientEmail],
      replyTo: clean.email,
      subject: `LINGUIFY - New contact request from ${clean.name}`,
      html: buildEmailHtml(clean),
    }));
  } catch (err) {
    console.error("Resend error:", err);
    return { status: 500, body: { error: "Sending email failed." } };
  }

  if (error) {
    return { status: 500, body: { error: error.message } };
  }

  return {
    status: 200,
    body: {
      success: true,
      message: "Email was successfully sent.",
      id: data?.id,
    },
  };
}

module.exports = { sendContactEmail, buildEmailHtml };
