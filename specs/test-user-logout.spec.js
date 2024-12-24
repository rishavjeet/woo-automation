import 'dotenv/config';

const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/userLogin');
const { generateTestCode } = require('../utils/generateRandomCode');

/**
 * Test suite for verifying the user logout functionality.
 * 
 * This test case performs the following:
 * 1. Logs in to a user account using the `loginToAccount` utility function.
 * 2. Simulates a logout action by clicking the "Logout" button.
 * 3. Verifies that the user is redirected to the application's login or main landing page by checking for the visibility of a specific heading.
 * 
 * Prerequisites:
 * - The `loginToAccount` utility function must correctly handle login operations.
 * - The "Logout" button must be accessible with the specified role and name.
 * - The application's landing page should contain a heading with the name "Contact List App".
 * 
 * Dependencies:
 * - Playwright's testing framework (`@playwright/test`) for browser automation and assertions.
 * - Utility functions `loginToAccount` for logging in and `generateTestCode` for generating unique test codes (though unused here, it is imported for completeness or potential test extensions).
 * 
 * @function
 * @name TestUserLogoutFeature
 * @async
 * @param {Object} page - The Playwright page object representing a browser page.
 * @returns {void}
 */

test('Test the user logout feature', async({page}) => {

	// Log in to the account using a utility function
	await loginToAccount(page);

	// Click the "Logout" button
	await page.getByRole('button', { name: 'Logout' }).click();

	// Assert that the user is redirected to the landing page by checking for a specific heading
	await expect(page.getByRole('heading', {name: 'Contact List App'})).toBeVisible();

})