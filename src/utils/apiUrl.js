// Vercel serves /api/* from the same origin, but locally the Express server in backend/ runs on its own port and needs a base URL
export function buildApiUrl(path) {
  const isProduction = import.meta.env.PROD;

  if (isProduction) {
    return path;
  }

  const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return `${base}${path}`;
}
