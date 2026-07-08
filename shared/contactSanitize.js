// shared/contactSanitize.js - validation and sanitization for contact form input
// used by both Vercel API and local Express server

// upper bounds to prevent arbitrarily large payloads
const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * E+escapes HTML-significant characters to prevent XSS.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * converts line breaks to <br> tags; must run AFTER escapeHtml
 */
function nl2br(str) {
  return str.replace(/\r\n|\r|\n/g, "<br>");
}

/**
 * validates raw form fields; returns array of error strings (empty = valid)
 */
function validateContactFields({ name, email, message } = {}) {
  const errors = [];

  if (typeof name !== "string" || !name.trim()) {
    errors.push("Name is required.");
  } else if (name.trim().length > LIMITS.name) {
    errors.push(`Name must be shorter than ${LIMITS.name} characters.`);
  }

  if (typeof email !== "string" || !email.trim()) {
    errors.push("Email is required.");
  } else if (email.trim().length > LIMITS.email) {
    errors.push(`Email must be shorter than ${LIMITS.email} characters.`);
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Invalid email address.");
  }

  if (typeof message !== "string" || !message.trim()) {
    errors.push("Message is required.");
  } else if (message.trim().length > LIMITS.message) {
    errors.push(`Message must be shorter than ${LIMITS.message} characters.`);
  }

  return errors;
}

/**
 * returns HTML-safe, trimmed versions of form fields
 */
function sanitizeContactFields({ name, email, message }) {
  return {
    name: escapeHtml(name.trim()),
    email: escapeHtml(email.trim()),
    message: escapeHtml(message.trim()),
  };
}

module.exports = {
  LIMITS,
  escapeHtml,
  nl2br,
  validateContactFields,
  sanitizeContactFields,
};
