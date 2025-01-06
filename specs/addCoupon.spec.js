const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

const {generateTestCode} = require('../utils/e2eUtils/randomTestCode');

const {removeTestCouponRecord} = require('../utils/e2eUtils/testCouponDeletion');

const {createCoupon} = require('../utils/e2eUtils/createCouponUtils');


test.describe('It should test the coupon features', ()=>{

	let testCode = 0;

	let couponCode = '';
	let couponDescription = '';

	test.beforeEach(()=>{
		testCode = generateTestCode();
	
		couponCode = `Off-${testCode}`;
		couponDescription = `Description for test coupon`;
	});

	test('It should test the add coupon feature', async ({admin, page})=>{

		await createCoupon(admin, page, couponCode, couponDescription);

		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();
	});

	test.afterEach(async({admin, page})=>{

		await removeTestCouponRecord(admin, page, couponCode);

	})


})