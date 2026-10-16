import { test, expect } from "@playwright/test";
test.use({ channel: "chrome" });

test("form validation, mocked provider failure and success", async ({
  page,
}) => {
  let succeed = false;
  let submitted = 0;
  await page.route("https://formspree.io/**", async (route) => {
    submitted++;
    await route.fulfill({
      status: succeed ? 200 : 503,
      contentType: "application/json",
      body: succeed ? '{"ok":true}' : '{"error":"Service unavailable"}',
    });
  });
  await page.goto("http://localhost:5188", { waitUntil: "domcontentloaded" });
  const submit = page.getByRole("button", { name: "Request a demo" });
  await submit.click();
  await expect(
    page.getByText("Please correct the highlighted fields and submit again."),
  ).toBeVisible();
  expect(submitted).toBe(0);
  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.locator("#company").fill("Example Company");
  await page
    .getByLabel("Current recovery method")
    .fill("Manual replay in a test Kafka environment.");
  await submit.click();
  await expect(page.getByText("Request received", { exact: true })).toHaveCount(
    0,
  );
  await expect(page.locator(".form-error-panel")).toBeVisible();
  succeed = true;
  await submit.click();
  await expect(
    page.getByText("Request received", { exact: true }),
  ).toBeVisible();
  expect(submitted).toBe(2);
});

test("responsive product media, operation choices and reduced motion", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://localhost:5187", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("checkbox", { name: "Pause progression" }),
  ).toBeChecked();
  await page.getByRole("button", { name: /Timestamp-window recovery/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Turn an incident window into a recovery scope.",
    }),
  ).toBeVisible();
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/homepage-${width}.png`,
      fullPage: true,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
    expect(
      await page
        .locator(".rg-product-image img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
  await expect(page.locator("video")).toHaveAttribute("preload", "none");
});

test("unconfigured form gives a real contact path instead of false success", async ({
  page,
}) => {
  await page.goto("http://localhost:5187", { waitUntil: "domcontentloaded" });
  const fallback = page.getByRole("link", {
    name: "Contact ReplayGuard by email",
  });
  if (await fallback.count()) {
    await expect(fallback).toHaveAttribute(
      "href",
      /^mailto:ravitheja.vkota@replayguard.in/,
    );
    await expect(
      page.getByRole("button", { name: "Request a demo" }),
    ).toBeDisabled();
  } else {
    await page.getByRole("button", { name: "Request a demo" }).click();
    await expect(
      page.getByText("Please correct the highlighted fields and submit again."),
    ).toBeVisible();
  }
});

test("Community is the primary path and limits are explicit", async ({
  page,
}) => {
  await page.goto("http://localhost:5187");
  await expect(
    page.getByRole("heading", { name: "ReplayGuard", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Install Community/ }).first(),
  ).toHaveAttribute("href", /replayguard-community/);
  await expect(page.getByText("5 actual executions / UTC month")).toBeVisible();
});

test("mobile navigation, preview and legal routes remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:5187");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Community", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Expand Execution controls screenshot" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Privacy", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("recovery proof and seven stages explain the core capabilities", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://localhost:5187");
  const flow = page.getByRole("group", { name: "Recovery workflow" });
  await expect(flow.getByRole("button")).toHaveCount(7);
  await flow.getByRole("button", { name: /Preview impact/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "See downstream impact before execution.",
    }),
  ).toBeVisible();
  await flow.getByRole("button", { name: /Audit & trace/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Know what replayed, who requested it and who approved.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Play workflow animation" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "The fix is deployed. The affected events remain.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("group", { name: "Product views" }).getByRole("button")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Every recovery has a record." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Expand Audit evidence screenshot" })).toHaveCount(0);
});

test("workflow advances automatically and pause keeps the stage stable", async ({
  page,
}) => {
  await page.goto("http://localhost:5187");
  await page.locator("#governance").scrollIntoViewIfNeeded();
  const flow = page.getByRole("group", { name: "Recovery workflow" });
  await expect(
    flow.getByRole("button", { name: /Inspect & select/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    flow.getByRole("button", { name: /Preview impact/ }),
  ).toHaveAttribute("aria-pressed", "true", { timeout: 10000 });
  await page.getByRole("checkbox", { name: "Pause progression" }).check();
  await page.waitForTimeout(7000);
  await expect(
    flow.getByRole("button", { name: /Preview impact/ }),
  ).toHaveAttribute("aria-pressed", "true");
});
