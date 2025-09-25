import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/web",
  "/dev",
  "/portfolio",
  "/shop",
  "/mylar-designs",
  "/custom-designs",
  "/tdstudios",
  "/tdlinkage",
  "/punkiez",
  "/quickprintz",
  "/contact",
];

test.describe("History routing + core routes", () => {
  for (const path of routes) {
    test(`loads ${path} without hash and returns app shell`, async ({
      page,
      baseURL,
    }) => {
      const url = `${baseURL}${path}`;
      const resp = await page.goto(url, { waitUntil: "networkidle" });
      expect(resp?.ok()).toBeTruthy();
      expect(page.url()).toBe(url);
      expect(page.url().includes("#")).toBeFalsy();
      // App shell smoke checks: html renders and root exists
      await expect(page.locator("#root")).toBeVisible();
    });
  }

  test("deep link hard refresh behaves (SPA fallback)", async ({
    page,
    baseURL,
  }) => {
    const url = `${baseURL}/tdstudios`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.reload({ waitUntil: "networkidle" });
    expect(page.url()).toBe(url);
    expect(page.url().includes("#")).toBeFalsy();
  });

  test("nonexistent route falls back to SPA (no server 404)", async ({
    page,
    baseURL,
  }) => {
    const url = `${baseURL}/nonexistent-route-xyz`;
    const resp = await page.goto(url, { waitUntil: "networkidle" });
    // Vercel rewrite to /index.html returns 200; UI may show a 404 component, which is fine.
    expect(resp?.ok()).toBeTruthy();
    await expect(page.locator("#root")).toBeVisible();
  });
});
