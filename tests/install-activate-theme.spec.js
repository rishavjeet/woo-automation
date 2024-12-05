import { test, expect } from '@playwright/test';

import { adminLogin } from '../utils/userLogin';

import { installActivateTheme } from '../utils/install-activate-theme';


/**
 * Playwright test to install and activate the "Astra" theme on a WordPress site.
 * 
 * This test performs the following steps:
 * 1. Logs in as an admin using the `adminLogin` utility.
 * 2. Installs and activates the "Astra" theme using the `installActivateTheme` utility.
 * 3. Verifies that the "Astra" theme is successfully activated by checking for a confirmation message or heading.
 * 
 * @param {object} page - The Playwright `page` object that represents a browser page.
 * 
 * @example
 * npx playwright test
 */

test('Install and activate theme in WP site', async ({page}) => {
	
	// Log in as an administrator
	await adminLogin(page);

	// Install and activate Astra theme
	await installActivateTheme(page);
	
	// Verify that the new user is visible on the page
	await expect(page.getByRole('heading',{ name: 'Active: Astra' })).toBeVisible();
});
