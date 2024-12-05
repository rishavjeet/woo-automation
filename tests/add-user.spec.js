import { test, expect } from '@playwright/test';

import { adminLogin } from '../utils/userLogin';

import { generateTestCode } from '../utils/generateRandomCode';

import { createWpSiteUser } from '../utils/createUser';

/**
 * Playwright test to add a user to a WordPress site.
 * 
 * This test performs the following steps:
 * 1. Logs in as an admin using the `adminLogin` utility.
 * 2. Generates a unique username and email for the new test user using `generateTestCode`.
 * 3. Creates a user on the WordPress site using the `createUser` utility.
 * 4. Verifies that the created user is visible on the page.
 * 
 * @param {object} page - The Playwright `page` object that represents a browser page.
 * 
 * @example
 * Run this test using Playwright CLI:
 * npx playwright test
 */

test('Add user to WP site', async ({page}) => {
	
	// Log in as an administrator
	await adminLogin(page);

	// Generate a random test code for a unique user identifier
	const testCode = generateTestCode();

	// Construct a unique username and email for the test user
	const testUserName = `testuser-${testCode}`;
	const testUserEmail = `test${testCode}@testing.com`;

	// Create a new user on the WordPress site
	await createWpSiteUser( page, testUserName, testUserEmail );
	
	// Verify that the new user is visible on the page
	await expect(page.getByRole('link',{ name: testUserName })).toBeVisible();
});