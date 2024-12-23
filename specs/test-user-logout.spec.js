import 'dotenv/config';

const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/userLogin');
const { generateTestCode } = require('../utils/generateRandomCode');

test('Test the user logout feature', async({page}) => {

	await loginToAccount(page);

	await page.getByRole('button', { name: 'Logout' }).click();

	await expect(page.getByRole('heading', {name: 'Contact List App'})).toBeVisible();

})