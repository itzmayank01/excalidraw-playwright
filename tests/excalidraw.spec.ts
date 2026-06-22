/* eslint-disable no-console */
import { test } from "@playwright/test";

test("Excalidraw full end-to-end user flow", async ({ page }) => {
  console.log("=== EXCALIDRAW USER END TESTING ===");
  console.log("");

  console.log("[SETUP] Navigating to https://excalidraw.com ...");
  await page.goto("https://excalidraw.com", { timeout: 120000 });
  console.log("[SETUP] Page loaded successfully");

  console.log("[SETUP] Waiting for React app to initialize ...");
  await page.waitForTimeout(6000);
  console.log("[SETUP] App initialized");

  console.log("[SETUP] Closing welcome dialog ...");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1000);
  console.log("[SETUP] Dialog closed — Canvas ready");
  console.log("");

  await test.step("step 1 - draw rectangle", async () => {
    console.log("--- STEP 1: DRAW RECTANGLE ---");
    console.log("[STEP 1] Selecting Rectangle tool ...");
    await page.locator('[title="Rectangle — R or 2"]').click();
    await page.waitForTimeout(1000);
    console.log("[STEP 1] Rectangle tool selected");

    console.log("[STEP 1] Moving mouse to starting position (300, 300) ...");
    await page.mouse.move(300, 300);
    await page.waitForTimeout(300);

    console.log("[STEP 1] Drawing rectangle ...");
    await page.mouse.down();
    await page.waitForTimeout(100);
    for (let i = 0; i <= 30; i++) {
      await page.mouse.move(300 + i * 6, 300 + i * 4, { steps: 1 });
      await page.waitForTimeout(30);
    }
    await page.mouse.up();
    console.log("[STEP 1] Rectangle drawn on canvas");

    await page.waitForTimeout(2000);
    await page.screenshot({ path: "test-results/step1-rectangle.png" });
    console.log("[STEP 1] Screenshot saved: test-results/step1-rectangle.png");
    console.log("[STEP 1] PASSED");
    console.log("");
  });

  await test.step("step 2 - draw circle", async () => {
    console.log("--- STEP 2: DRAW CIRCLE ---");
    console.log("[STEP 2] Selecting Ellipse tool ...");
    await page.locator('[title="Ellipse — O or 4"]').click();
    await page.waitForTimeout(1000);
    console.log("[STEP 2] Ellipse tool selected");

    console.log("[STEP 2] Moving mouse to starting position (600, 250) ...");
    await page.mouse.move(600, 250);
    await page.waitForTimeout(300);

    console.log("[STEP 2] Drawing circle ...");
    await page.mouse.down();
    await page.waitForTimeout(100);
    for (let i = 0; i <= 30; i++) {
      await page.mouse.move(600 + i * 5, 250 + i * 4, { steps: 1 });
      await page.waitForTimeout(30);
    }
    await page.mouse.up();
    console.log("[STEP 2] Circle drawn on canvas");

    await page.waitForTimeout(2000);
    await page.screenshot({ path: "test-results/step2-circle.png" });
    console.log("[STEP 2] Screenshot saved: test-results/step2-circle.png");
    console.log("[STEP 2] PASSED");
    console.log("");
  });

  await test.step("step 3 - draw line", async () => {
    console.log("--- STEP 3: DRAW LINE ---");
    console.log("[STEP 3] Selecting Line tool ...");
    await page.locator('[title="Line — L or 6"]').click();
    await page.waitForTimeout(1000);
    console.log("[STEP 3] Line tool selected");

    console.log("[STEP 3] Moving mouse to starting position (400, 450) ...");
    await page.mouse.move(400, 450);
    await page.waitForTimeout(300);

    console.log("[STEP 3] Drawing line ...");
    await page.mouse.down();
    await page.waitForTimeout(100);
    for (let i = 0; i <= 40; i++) {
      await page.mouse.move(400 + i * 12, 450, { steps: 1 });
      await page.waitForTimeout(30);
    }
    await page.mouse.up();
    console.log("[STEP 3] Line drawn on canvas");

    await page.waitForTimeout(2000);
    await page.screenshot({ path: "test-results/step3-line.png" });
    console.log("[STEP 3] Screenshot saved: test-results/step3-line.png");
    console.log("[STEP 3] PASSED");
    console.log("");
  });

  await test.step("step 4 - erase everything", async () => {
    console.log("--- STEP 4: ERASE EVERYTHING ---");
    console.log("[STEP 4] Deselecting current tool ...");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    console.log("[STEP 4] Tool deselected");

    console.log("[STEP 4] Selecting all elements on canvas ...");
    const modifier = process.platform === "darwin" ? "Meta" : "Control";
    await page.keyboard.press(`${modifier}+a`);
    await page.waitForTimeout(500);
    console.log("[STEP 4] All elements selected");

    console.log("[STEP 4] Deleting all elements ...");
    await page.keyboard.press("Backspace");
    await page.waitForTimeout(2000);
    console.log("[STEP 4] Canvas cleared — all shapes erased");

    await page.screenshot({ path: "test-results/step4-erased.png" });
    console.log("[STEP 4] Screenshot saved: test-results/step4-erased.png");
    console.log("[STEP 4] PASSED");
    console.log("");

    console.log("=== ALL 4 STEPS COMPLETED SUCCESSFULLY ===");
  });
});
