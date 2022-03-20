import { test, expect } from "@playwright/test";

test.describe("execute commands", () => {
  test("appendable script", async ({ page }) => {
    await page.goto("/");

    await page.press(".cm-activeLine", "Control+k");

    await page.type('input[aria-label="Search command..."]', "timestamp");

    await page.locator("li.active").dblclick();

    const locator = page.locator(".cm-activeLine");

    await expect(locator).toHaveText(/[0-9]{10}/);
  });

  test("content replacement", async ({ page }) => {
    await page.goto("/");

    await page.type(
      ".cm-activeLine",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    );

    await page.press(".cm-activeLine", "Control+k");

    await page.type('input[aria-label="Search command..."]', "jwt decode");

    await page.locator("li.active").dblclick();

    const locator = page.locator(".cm-activeLine");

    await expect(locator).toHaveText("}");
  });

  test("failed content replacement", async ({ page }) => {
    await page.goto("/");

    await page.type(".cm-activeLine", "no valid token here");

    await page.press(".cm-activeLine", "Control+k");

    await page.type('input[aria-label="Search command..."]', "jwt decode");

    await page.locator("li.active").dblclick();

    const locator = page.locator(".danger span");

    await expect(locator).toHaveText("Invalid Token");
  });
});
