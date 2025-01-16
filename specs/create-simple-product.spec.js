/**
 * @fileoverview E2E test for testing the Simple Product functionality
 * 
 * This script tests the creation and deletion of a simple product in a WordPress environment
 * using Playwright E2E testing utilities.
 */

const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

require("dotenv").config();


/**
 * Test suite to verify the functionality of creating and managing a Simple Product in WooCommerce.
 */
test.describe('It should test the Simple Product Functionality', ()=>{

	/**
     * Unique identifier for the test product, used to ensure uniqueness across tests.
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
     * Test case to verify the creation of a simple product.
     * 
     * It checks for the success message after the product is published.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should test the creation of simple product', async({admin, page})=>{

		// Verify that the success message is displayed on the page
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]//p')).toContainText('Product published.');
	
	});

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
	
	})
})