const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "joejqs",
  e2e: {
    video:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
