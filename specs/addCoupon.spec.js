const {test, expect} = require('@wordpress/e2e-test-utils-playwright');

test.describe('It should test the coupon features', ()=>{
	test('It should test the add coupon feature', async ({admin, page})=>{
		await admin.visitAdminPage('post-new.php','post_type=shop_coupon');
		const couponCodeField = page.locator('//input[@id="title"]');
		await couponCodeField.fill("offtest");
		const couponDescription = page.locator('//textarea[@id="woocommerce-coupon-description"]');
		await couponDescription.fill("This is for testing purpose");
		const couponTypeField = page.locator('//select[@id="discount_type"]');
		await couponTypeField.selectOption('Percentage discount');
		const couponAmountField = page.locator('//input[@id="coupon_amount"]');
		await couponAmountField.fill('10');
		const couponExpiryField = page.locator('//input[@id="expiry_date"]');
		await couponExpiryField.fill('2025-01-22');

		const submitButton = page.locator('//input[@id="publish"]');
		await submitButton.click();

		await expect(page.locator('//div[@id="message" and contains(@class,"notice-success")]')).toBeVisible();
	})
})