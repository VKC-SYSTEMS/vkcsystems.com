import { test, expect } from "@playwright/test";

const BASE_URL = "https://vkcsystems.com";

test("submit contact form with test data", async ({ page }) => {
  await page.goto(`${BASE_URL}/contact`);

  await page.locator('input[name="name"]').fill("Playwright Test");
  await page.locator('input[name="email"]').fill("info@vkcsystems.com");
  await page.locator('input[name="phone"]').fill("201-374-0252");
  await page.locator('input[name="company"]').fill("VKC Systems (Test)");
  await page.locator('textarea[name="message"]').fill(
    "This is an automated test submission from Playwright. Please disregard."
  );

  await page.locator('button[type="submit"]').click();

  // Wait for navigation to formsubmit.co
  await page.waitForURL(/formsubmit\.co/, { timeout: 10000 });

  // Take a screenshot of whatever Formsubmit shows
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "test/contact-form-result.png", fullPage: true });

  const finalUrl = page.url();
  const bodyText = await page.locator("body").textContent();

  console.log("Final URL:", finalUrl);
  console.log("Page content:", bodyText?.slice(0, 500));

  // Form was submitted — it reached formsubmit.co
  expect(finalUrl).toContain("formsubmit.co");
});
