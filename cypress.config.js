const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "y7cyey",
  viewportHeight: 960,
  viewportWidth: 1200,
  fixturesFolder: false,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
