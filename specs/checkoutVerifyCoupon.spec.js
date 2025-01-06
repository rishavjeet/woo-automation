const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const {removeTestCouponRecord} = require('../utils/e2eUtils/testCouponDeletion');

const {createCoupon} = require('../utils/e2eUtils/createCouponUtils');

const {applyCouponDiscount} = require('../utils/e2eUtils/applyCouponUtils');

require("dotenv").config();

test.describe('It should test the coupon discounts', ()=> {

	let testCode = 0;
	let productTitle = '';
	let productDescription = '';

	let couponCode = '';
	let couponDescription = '';

	test.beforeEach( async ({admin,  page})=>{

		testCode = generateTestCode();

		productTitle = `Product Demo Title ${testCode}`;
		productDescription = `Demo Product Description ${testCode}`;

		couponCode = `Off-${testCode}`;
		couponDescription = `Description for test coupon`;

		await addNewProduct(admin, page, productTitle, productDescription);

		await addPricingInventory(admin, page);

		await createCoupon(admin, page, couponCode, couponDescription);

	})

	test('The coupons should apply proper discount', async({admin,  page})=>{

		await applyCouponDiscount(page, productTitle, couponCode);

		const discountValue = page.locator('//div[contains(@class,"wc-block-components-totals-discount")]//span[contains(@class,"wc-block-components-totals-item__value")]');

		await expect(discountValue).toContainText('8.00');

	})

	test.afterEach(async ({admin, page}) => {

		await page.goto(`${process.env.WP_BASE_URL}/cart`);

		const removeItemBtn = page.locator('//button[@class="wc-block-cart-item__remove-link"]');
		await removeItemBtn.click();

		await removeTestProductRecord(admin, page, productTitle);

		await removeTestCouponRecord(admin, page, couponCode);

	});
})