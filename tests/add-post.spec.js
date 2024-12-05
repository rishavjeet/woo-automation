/**
 * @fileoverview This script tests the functionality of adding a new post in WordPress.
 * It verifies that an admin user can log in, create a post, and confirm the post appears in the post list.
 */

import { test, expect } from '@playwright/test';

import { adminLogin } from '../utils/userLogin';

import { createWpPost } from '../utils/createPost';

/**
 * Test: WP Add Post
 * 
 * This test automates the process of logging in as an admin, creating a new post,
 * and verifying that the post appears in the WordPress admin dashboard's post list.
 */
test('WP Add Post Test', async ({ page }) => {
	
	// Log in as the WordPress admin using the utility function
	await adminLogin(page);

	// Create a new WordPress post using the utility function
	await createWpPost(page);
	
	// Navigate to the post list by clicking the "View Posts" button
	await page.getByLabel('View Posts').click();

	/**
	 * Assert that the new post appears in the post list
     * The post is identified by its title "Test Post" and "Edit" option
	 */
	await expect(page.getByLabel('“Test Post” (Edit)')).toBeVisible();
});
