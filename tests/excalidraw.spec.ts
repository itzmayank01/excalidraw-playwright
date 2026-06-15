import { test, expect } from '@playwright/test';

test('excalidraw homepage loads', async ({ page }) => {
    await page.goto('https://excalidraw.com', { timeout: 60000 });
    await expect(page).toHaveTitle(/Excalidraw/);
    console.log('Title verified: Excalidraw loaded');
});

test('excalidraw canvas is visible', async ({ page }) => {
    await page.goto('https://excalidraw.com', { timeout: 60000 });
    await page.waitForTimeout(3000);
    const canvas = page.locator('canvas.excalidraw__canvas.interactive');
    await expect(canvas).toBeVisible();
    console.log('Canvas element found and visible');
});

test('excalidraw screenshot', async ({ page }) => {
    await page.goto('https://excalidraw.com', { timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/excalidraw-home.png' });
    console.log('Screenshot saved to test-results/');
});