import { test, expect } from '@playwright/test';

// Basic E2E test for chat workflow using mocked response

test('send message and show reply', async ({ page }) => {
  // Intercept askAgent API
  await page.route('**/ask', route => {
    route.fulfill({ status: 200, body: JSON.stringify({ reply: 'hello back' }) });
  });

  await page.goto('/app');
  await page.fill('input[placeholder="Ask the AI..."]', 'hello');
  await page.click('button:has-text("Send")');
  await expect(page.locator('text=hello back')).toBeVisible();
});
