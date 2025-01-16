/**
 * @fileoverview E2E test to validate coupon-related features in WordPress.
 *
 * This test suite focuses on creating and validating the addition of coupons.
 * After the test execution, the created coupon is removed to maintain a clean state.
 */

const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestCouponRecord} = require('../utils/e2eUtils/testCouponDeletion');

const {createCoupon} = require('../utils/e2eUtils/createCouponUtils');

/**
 * Test suite to validate coupon creation functionality.
 */
test.describe('It should test the coupon features', ()=>{

	/**
     * Unique identifier for test data, ensuring uniqueness across tests.
     * @type {number}
     */
	let testCode = 0;

	/**
     * Coupon code and description for the test coupon.
     * @type {string}
     */
	let couponCode = '';
	let couponDescription = '';

	/**
     * Hook that runs before each test in this suite.
     * 
     * It generates a unique coupon code and description.
     */
	test.beforeEach(()=>{
		testCode = generateTestCode();
	
		couponCode = `Off-${testCode}`;
		couponDescription = `Description for test coupon`;
	});

	/**
     * Test case to create a new coupon and validate its addition.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test('It should test the add coupon feature', async ({admin, page})=>{

		// Create a new coupon
		await createCoupon(admin, page, couponCode, couponDescription);

		// Verify success message is visible
		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();
	});

	/**
     * Hook that runs after each test in this suite.
     * 
     * It removes the test coupon created during the test.
     * 
     * @param {object} context - Test context containing admin and page objects.
     */
	test.afterEach(async({admin, page})=>{

		await removeTestCouponRecord(admin, page, couponCode);

	})


})