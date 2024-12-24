const { test, expect } = require('@playwright/test');

const { loginToAccount } = require('../utils/userLogin');

/**
 * Test suite for verifying the user login functionality.
 * 
 * This test case performs the following:
 * 1. Logs in to a user account using the `loginToAccount` utility function.
 * 2. Verifies that the login process successfully redirects the user to the main page by checking for the visibility of a specific heading.
 * 
 * Prerequisites:
 * - The `loginToAccount` utility function must correctly handle login operations.
 * - The application's main page must contain a heading with the name "Contact List" upon successful login.
 * 
 * Dependencies:
 * - Playwright's testing framework (`@playwright/test`) for browser automation and assertions.
 * - Utility function `loginToAccount` for logging in to the user account.
 * 
 * @function
 * @name TestUserLoginFeature
 * @async
 * @param {Object} page - The Playwright page object representing a browser page.
 * @returns {void}
 */

test('Test User Login Feature', async({page})=>{

	// Log in to the account using a utility function
	await loginToAccount(page);

	// Assert that the user is redirected to the main page by checking for a specific heading
	await expect(page.getByRole('heading', {name: 'Contact List'})).toBeVisible();

});
