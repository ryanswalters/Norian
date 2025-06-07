const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'template/app/tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'wasp start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
});
