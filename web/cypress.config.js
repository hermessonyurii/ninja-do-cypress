const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'tgp3ax',
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true
  },
});
