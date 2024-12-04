import { test, expect } from '@playwright/test';

// const { chromium } = require("playwright-extra");

// const stealth = require("puppeteer-extra-plugin-stealth")();

// chromium.use(stealth);

// chromium.launch({ headless: true }).then(async (browser) => {
// 	const page = await browser.newPage();
  
// 	console.log("Testing the stealth plugin..");
// 	await page.goto("https://demo.opencart.com/", { waitUntil: "networkidle" });
// 	await page.screenshot({ path: "g2 passed.png", fullPage: true });
  
// 	console.log("All done, check the screenshot. ✨");
// 	await browser.close();
//   });

test('test', async ({ page }) => {

	
	await page.setExtraHTTPHeaders({
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
		'Accept-Language': 'en-US,en;q=0.9'
	});
	await page.goto('https://demo.opencart.com/');
	// test.setTimeout(60000);

	// await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000)));
	// await page.evaluate(() => window.scrollBy(0, window.innerHeight));
	// await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000)));
	// await page.waitForLoadState('load');
//   await page.waitForSelector('#header-cart');
    await page.getByRole('link', { name: ' My Account ' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('TestFName');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('TestLName');
  await page.getByPlaceholder('E-Mail').click();
  await page.getByPlaceholder('E-Mail').fill('trial@trial.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('trialpwd');
  await page.locator('input[name="agree"]').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
});

