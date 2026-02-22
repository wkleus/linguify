// This config tells Babel how to transform your code for Jest
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }, // Match current Node version
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // So you don't need to import React manually
      },
    ],
  ],
};
