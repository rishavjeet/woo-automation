/**
 * @fileoverview This script tests the functionality of adding a new post in WordPress.
 * It verifies that an admin user can log in, create a post, and confirm the post appears in the post list.
 */

import { test, expect } from "@playwright/test";

import { adminLogin } from "../utils/userLogin";

import { createWpPost } from "../utils/createPost";

import { generateTestCode } from "../utils/generateRandomCode";

/**
 * Test Suite: Post Management
 *
 * This suite contains tests related to managing posts in a WordPress site.
 * Specifically, it includes tests for adding new posts through the WordPress admin interface.
 *
 * The following test is included in this suite:
 * - WP Add Post Test: Logs in as an admin, creates a new post, and verifies the post appears in
 *   the post list in the WordPress admin dashboard.
 *
 * Each test runs with the necessary setup and teardown procedures to ensure a clean and
 * isolated test environment.
 */
test.describe("Post Management Test suits", async () => {
  // Variable to store the test post title.
  let postTitle = "";

  test.afterEach(async ({ page }) => {
    // await page.getByRole("link", { name: "Posts", exact: true }).click();
    // const postEntry = await page.getByLabel(`"${postTitle}" (Edit)`);
    // await postEntry.hover();
    // await page.getByLabel(`Move "${postTitle}" to the`).click();
    // await page.getByRole("link", { name: "Trash (1)" }).click();
    // await page.getByLabel(`Delete "${postTitle}" permanently`).click();
  });

  /**
   * Test: WP Add Post
   *
   * This test automates the process of logging in as an admin, creating a new post,
   * and verifying that the post appears in the WordPress admin dashboard's post list.
   */
  test.only("WP Add Post Test", async ({ page }) => {
    // Log in as the WordPress admin using the utility function
    await adminLogin(page);

    // Generate a 4-digit code for post title.
    const postTitleCode = generateTestCode();

    // Stores the post title by concating the number.
    postTitle = `Test Post-${postTitleCode}`;

    // Create a new WordPress post using the utility function
    await createWpPost(page, postTitle);

    // Navigate to the post list by clicking the "View Posts" button
    await page.getByLabel("View Posts").click();

    /**
     * Assert that the new post appears in the post list
     * The post is identified by its title "Test Post" and "Edit" option
     */
    await expect(page.getByLabel(`“${postTitle}” (Edit)`)).toBeVisible();
  });

  test("Edit Existing WP Post", async({ page }) => {
	await adminLogin( page );

	// Generate a 4-digit code for post title.
    const postTitleCode = generateTestCode();

    // Stores the post title by concating the number.
    postTitle = `Test Post-${postTitleCode}`;

	await createWpPost( page, postTitle );

	await page.getByLabel("View Posts").click();

	await page.getByLabel(`“${postTitle}” (Edit)`).click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Block: Paragraph').click();
	await page.locator('iframe[name="editor-canvas"]').contentFrame().getByLabel('Block: Paragraph').fill('This is a test post.Updated Content.');
	await page.getByRole('button', { name: 'Save', exact: true }).click();

	await page.goto(`${process.env.TEST_WEBSITE_URL}/post/test-post-${postTitleCode}`);

	await expect(page.getByText('This is a test post.Updated Content.')).toBeVisible();

  });

});
