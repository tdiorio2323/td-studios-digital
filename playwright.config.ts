import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:8081",
    trace: "on-first-retry",
    headless: true,
  },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:8081",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
