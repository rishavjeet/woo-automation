/**
 * @fileoverview E2E test to verify coupon discount functionality in WooCommerce.
 * 
 * This script creates a product, adds pricing and inventory, generates a coupon,
 * and verifies that the coupon discount is applied correctly in the cart.
 * It also includes cleanup of test data after each test.
 */

const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const {removeTestCouponRecord} = require('../utils/e2eUtils/testCouponDeletion');

const {createCoupon} = require('../utils/e2eUtils/createCouponUtils');

const {applyCouponDiscount} = require('../utils/e2eUtils/applyCouponUtils');

require("dotenv").config();

/**
 * Test suite to verify WooCommerce coupon discounts.
 */
test.describe('It should test the coupon discounts', ()=> {

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

	/**
     * Code and description of the test coupon.
     * @type {string}
     */
	let productDescription = '';

	/**
     * Code and description of the test coupon.
     * @type {string}
     */
	let couponCode = '';
	let couponDescription = '';

	/**
     * Hook that runs before each test in this suite.
     * 
     * It generates unique product and coupon details, creates a product with pricing,
     * and generates a coupon for testing.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.beforeEach( async ({admin,  page})=>{

		// Generate a unique test code for the product and coupon
		testCode = generateTestCode();

		// Set the product title and description
		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		// Set the coupon code and description
		couponCode = `Off-${testCode}`;
		couponDescription = `Description for test coupon`;

		// Add a new product with pricing and inventory
		await addNewProduct(admin, page, productTitle, productDescription);
		await addPricingInventory(admin, page);

		// Create a new coupon
		await createCoupon(admin, page, couponCode, couponDescription);

	})

	/**
     * Test case to verify that the coupon discount is applied correctly.
     * 
     * It applies the coupon to the cart and checks the discount value.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('The coupons should apply proper discount', async({admin,  page})=>{

		// Apply the coupon to the product in the cart
		await applyCouponDiscount(page, productTitle, couponCode);

		// Verify the discount value in the cart
		const discountValue = page.locator('//div[contains(@class,"wc-block-components-totals-discount")]//span[contains(@class,"wc-block-components-totals-item__value")]');
		await expect(discountValue).toContainText('8.00');

	})

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes the test product and coupon created during the test.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.afterEach(async ({admin, page}) => {

		// Navigate to the cart page
		await page.goto(`${process.env.WP_BASE_URL}/cart`);

		// Remove the product from the cart
		const removeItemBtn = page.locator('//button[@class="wc-block-cart-item__remove-link"]');
		await removeItemBtn.click();

		// Remove the test product and coupon
		await removeTestProductRecord(admin, page, productTitle);
		await removeTestCouponRecord(admin, page, couponCode);

	});
})