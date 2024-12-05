/**
 * @fileoverview This script tests the WordPress Admin User login functionality.
 * It uses Playwright's testing library to verify that the admin user can successfully log in
 * and navigate to the Dashboard page.
 */

import { test, expect } from '@playwright/test';

import { adminLogin } from '../utils/userLogin';

/**
 * Test: WP User Admin Login
 * 
 * This test validates the admin login functionality by calling the `adminLogin` utility function
 * and verifying that the Dashboard heading is visible after a successful login.
 */
test('WP User Admin Login Test', async ({ page }) => {

	// Call the adminLogin function to perform the login action
	adminLogin(page);

	// Assert that the heading "Dashboard" is visible, indicating a successful login
  	await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});