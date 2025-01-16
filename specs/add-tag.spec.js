/**
 * E2E Test Suite: Product Tag Features
 *
 * This test suite verifies the functionality of the Product Tag feature in the WordPress application.
 * It includes tests to add a new tag and ensures proper cleanup after each test.
 *
 * Dependencies:
 * - @wordpress/e2e-test-utils-playwright: Provides utility functions for Playwright-based WordPress E2E tests.
 * - Custom utility functions: generateTestCode, createTaxonomy, deleteTestTaxonomy.
 */

const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {createTaxonomy} = require('../utils/e2eUtils/addTaxonomyUtils');

const {deleteTestTaxonomy} = require('../utils/e2eUtils/removeTestTaxonomtyUtils');

/**
 * Test Suite: Product Tag Features
 */
test.describe("It should test the Product Tag features", () => {

	let testCode = 0;

	let tagName = '';
	let tagDescription = '';

	/**
	 * Hook: Before each test
	 *
	 * Generates unique test data for tag name and description.
	 */
	test.beforeEach(()=>{

		testCode = generateTestCode(); // Generate unique test code
	
		tagName = `Test Tag ${testCode}`; // Create unique tag name
		tagDescription = `This is tag description for ${tagName}`; // Create unique tag description

	});


	/**
	 * Test Case: Add Tag Feature
	 *
	 * Verifies that a new product tag can be successfully created and displayed in the UI.
	 *
	 * @param {object} admin - Admin credentials for authentication.
	 * @param {object} page - Playwright page object for browser interaction.
	 */
	test("It should test the add tag feature", async ({ admin, page }) => {

		// Create a new taxonomy (tag) using the provided utility function
		await createTaxonomy(admin, page, 'Tag', tagName, tagDescription);

		// Verify that the created tag is visible in the UI
		await expect(page.locator(`//a[contains(@class, "row-title") and text()="${tagName}"]`)).toBeVisible();
	});


	/**
	 * Hook: After each test
	 *
	 * Cleans up by deleting the test tag created during the test.
	 * Logs the name of the tag being deleted for debugging purposes.
	 *
	 * @param {object} page - Playwright page object for browser interaction.
	 */
	test.afterEach(async({page})=>{
	
		// Delete the test tag using the provided utility function
		await deleteTestTaxonomy(page, tagName);
	});


});
