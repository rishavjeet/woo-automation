const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {addNewProduct} = require('../utils/e2eUtils/createProductUtils');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestProductRecord} = require('../utils/e2eUtils/testProductDeletion');

const {addPricingInventory} = require('../utils/e2eUtils/productInventoryUtils');

const { extractPrdtSlug } = require("../utils/e2eUtils/getProductSlug");

const {removeTestCouponRecord} = require('../utils/e2eUtils/testCouponDeletion');

const {createCoupon} = require('../utils/e2eUtils/createCouponUtils');

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

	test('The coupons should apply proper discount', async({admin,  page, requestUtils})=>{

		const prdtSlug = extractPrdtSlug(productTitle);

		await page.goto(`${process.env.WP_BASE_URL}product/${prdtSlug}`);

		const addToCartBtn = page.locator('//button[contains(text(),"Add to cart")]');
  		await addToCartBtn.click();

		await page.goto(`${process.env.WP_BASE_URL}checkout`);

		const couponFieldBtn = page.locator('//div[contains(@class,"wc-block-components-totals-coupon")]//div[@role="button"]');
		await couponFieldBtn.click();

		const couponCodeField = page.locator('//input[@id="wc-block-components-totals-coupon__input-coupon"]');
		await couponCodeField.click();

		await couponCodeField.fill(couponCode);

		const couponApplyBtn = page.locator('//span[contains(text(),"Apply")]');
		await couponApplyBtn.click();

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