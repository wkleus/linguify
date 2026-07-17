// returns name of first missing env var or null if all are set
function missingEnvVar(names) {
  return names.find((name) => !process.env[name]) || null;
}

module.exports = { missingEnvVar };
