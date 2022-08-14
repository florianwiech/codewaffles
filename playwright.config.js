/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 * @see https://playwright.dev/docs/test-configuration.
 */
const config = {
  testDir: "./e2e",
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
};

export default config;
