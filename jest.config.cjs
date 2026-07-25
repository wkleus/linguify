module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/__tests__/useTranslator.test.js", // Ignore this test; NOTE: test it later
  ],
};
