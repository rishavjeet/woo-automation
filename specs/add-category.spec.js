/**
 * E2E Test Suite: Product Category Features
 *
 * This test suite verifies the functionality of the Product Category feature in the WordPress application.
 * It includes tests to add a new category and ensure proper cleanup after each test.
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
 * Test Suite: Product Category Features
 */

test.describe("It should test the Product Category features", () => {

	let testCode = 0; // Unique test code for each test

	let catName = ''; // Category name
	let catDescription = ''; // Category description

	/**
	 * Hook: Before each test
	 *
	 * Generates unique test data for category name and description.
	 */
	test.beforeEach(()=>{

		testCode = generateTestCode();
	
		catName = `Test Tag ${testCode}`;
		catDescription = `This is tag description for ${catName}`;

	});

	/**
	 * Test Case: Add Category Feature
	 *
	 * Verifies that a new product category can be successfully created and displayed in the UI.
	 *
	 * @param {object} admin - Admin credentials for authentication.
	 * @param {object} page - Playwright page object for browser interaction.
	 */
	test("It should test the add category feature", async ({ admin, page }) => {

		// Create a new taxonomy (category) using the provided utility function
		await createTaxonomy(admin, page, 'Category', catName, catDescription);

		// Verify that the created category is visible in the UI
		await expect(page.locator(`//a[contains(@class, "row") and text()="${catName}"]`)).toBeVisible();
	});

	/**
	 * Hook: After each test
	 *
	 * Cleans up by deleting the test category created during the test.
	 *
	 * @param {object} page - Playwright page object for browser interaction.
	 */
	test.afterEach(async({page})=>{

		// Delete the test category using the provided utility function
		await deleteTestTaxonomy(page, catName);
	});

});

