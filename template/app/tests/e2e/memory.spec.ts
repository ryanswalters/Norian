import { test, expect } from '@playwright/test';

test('memory page shows entries', async ({ page }) => {
  await page.route('**/mind/list', route => {
    route.fulfill({ status: 200, body: JSON.stringify([{ content: 'hello' }]) });
  });

  await page.goto('/admin');
  await expect(page.locator('text=hello')).toBeVisible();
});
