import { test, expect } from "@playwright/test";

const BASE_URL = "https://vkcsystems.com";

test.describe("Phase 6: Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
  });

  test("form renders with all required fields", async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("required fields have required attribute", async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toHaveAttribute("required", "");
    await expect(page.locator('input[name="email"]')).toHaveAttribute("required", "");
    await expect(page.locator('textarea[name="message"]')).toHaveAttribute("required", "");
  });

  test("optional fields do not have required attribute", async ({ page }) => {
    const phone = page.locator('input[name="phone"]');
    const company = page.locator('input[name="company"]');
    await expect(phone).not.toHaveAttribute("required", "");
    await expect(company).not.toHaveAttribute("required", "");
  });

  test("email field validates email format", async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute("type", "email");
  });

  test("phone field has tel type", async ({ page }) => {
    const phoneInput = page.locator('input[name="phone"]');
    await expect(phoneInput).toHaveAttribute("type", "tel");
  });

  test("form action points to Formsubmit.co", async ({ page }) => {
    const form = page.locator("form");
    const action = await form.getAttribute("action");
    expect(action).toContain("formsubmit.co");
    expect(action).toContain("info@vkcsystems.com");
  });

  test("form method is POST", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toHaveAttribute("method", "POST");
  });

  test("honeypot field exists and is hidden", async ({ page }) => {
    const honeypot = page.locator('input[name="_honey"]');
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).toBeHidden();
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    await expect(honeypot).toHaveAttribute("autocomplete", "off");
  });

  test("CAPTCHA is enabled", async ({ page }) => {
    const captcha = page.locator('input[name="_captcha"]');
    await expect(captcha).toHaveCount(1);
    await expect(captcha).toHaveAttribute("value", "true");
  });

  test("redirect is configured after submission", async ({ page }) => {
    const next = page.locator('input[name="_next"]');
    await expect(next).toHaveCount(1);
    const value = await next.getAttribute("value");
    expect(value).toBe("https://vkcsystems.com/contact");
  });

  test("custom subject line is set", async ({ page }) => {
    const subject = page.locator('input[name="_subject"]');
    await expect(subject).toHaveCount(1);
    const value = await subject.getAttribute("value");
    expect(value).toContain("VKC Systems");
  });

  test("form prevents submission with empty required fields", async ({ page }) => {
    const [request] = await Promise.all([
      page.waitForRequest("**/formsubmit.co/**", { timeout: 2000 }).catch(() => null),
      page.locator('button[type="submit"]').click(),
    ]);
    // No request should fire — browser validation blocks it
    expect(request).toBeNull();
  });

  test("Google Maps iframe loads", async ({ page }) => {
    const iframe = page.locator('iframe[src*="google.com/maps"]');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("loading", "lazy");
    await expect(iframe).toHaveAttribute("title", /VKC Systems/i);
  });
});
