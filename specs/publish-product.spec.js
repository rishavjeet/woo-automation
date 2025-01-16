/**
 * @fileoverview E2E test to verify the visibility of products in WooCommerce.
 * 
 * This script ensures that a product can be created, published, and its visibility verified.
 */

const { test, expect } = require("@wordpress/e2e-test-utils-playwright");

const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

require("dotenv").config();

/**
 * Test suite to verify the visibility of products after publishing.
 */
test.describe('It should verify the verify the visibility of products', ()=>{

	/**
     * Unique identifier for the test product, ensuring uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Title of the product to be created in the test.
     * @type {string}
     */
	let productTitle = '';

	/**
     * Description of the product to be created in the test.
     * @type {string}
     */
	let productDescription = '';

	/**
     * Hook that runs before each test in this suite.
     * 
     * It generates unique product details and creates a new product using the utility function.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.beforeEach( async ({admin,  page})=>{

		// Generate a unique test code for the product
		testCode = generateTestCode();

		// Set the product title and description with the unique test code
		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		// Add a new product using the utility function
		await addNewProduct(admin, page, productTitle, productDescription);

	})

	/**
     * Test case to verify the visibility of the product after publishing.
     * 
     * It clicks the "View Product" link and checks the product page title.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should publish and then verify the visibility of the products', async({admin, page})=>{

		// Locate and click the "View Product" link in the success message
		const viewProductLink = page.locator('//div[@id="message" and contains(@class,"notice-success")]//a');
		await viewProductLink.click();

		// Store the product page title
		const productPageTitle = await page.title();

		// Verify the title of the product page
		await expect(productPageTitle).toContain(productTitle);

	})

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes the test product created during the test.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.afterEach(async ({admin, page})=>{

		// Remove the test product using the utility function
		await removeTestProductRecord(admin, page, productTitle);
	});
})
