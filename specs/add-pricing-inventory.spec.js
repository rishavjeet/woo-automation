/**
 * @fileoverview E2E test to verify the Pricing and Inventory functionality in WordPress.
 * 
 * This script creates a new product, adds pricing and inventory details, and validates the changes
 * by checking the visibility of a success message. After the test, the product is deleted to maintain a clean state.
 */

const { test, expect } = require("@wordpress/e2e-test-utils-playwright");
const { addNewProduct } = require("../utils/e2eUtils/createProductUtils");
const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

/**
 * Test suite to validate the Pricing and Inventory functionality.
 */
test.describe('Test should check the Pricing and Inventory feature', () => {

	/**
     * Unique identifier for test data, ensuring uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Title and description of the test product.
     * @type {string}
     */
	let productTitle = '';
	let productDescription = '';

	/**
     * Hook that runs before each test in this suite.
     * 
     * It generates a new product and assigns a unique title and description.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.beforeEach(async ({admin, page})=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		// Create a new product
		await addNewProduct(admin, page, productTitle, productDescription);

	});
	
	/**
     * Test case to add pricing and inventory to the product and validate success.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should add the pricing and inventory', async({admin, page})=>{
		
		// Add pricing and inventory details to the product
		await addPricingInventory(admin, page);
		
		// Verify success message is visible
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();

	});

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes the test product created during the test.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.afterEach(async ({admin, page})=>{

		await removeTestProductRecord(admin, page, productTitle);
		
	})
})
