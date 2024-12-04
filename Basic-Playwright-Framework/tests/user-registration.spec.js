import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

	test.setTimeout(60000);

  await page.goto('https://demo.opencart.com/');
  await page.waitForLoadState('load');
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

