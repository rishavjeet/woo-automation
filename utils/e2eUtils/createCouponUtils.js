const createCoupon = async (admin, page, couponCode, couponDescription) => {
  await admin.visitAdminPage("post-new.php", "post_type=shop_coupon");
  const couponCodeField = page.locator('//input[@id="title"]');
  await couponCodeField.fill(couponCode);
  const couponDescriptionField = page.locator(
    '//textarea[@id="woocommerce-coupon-description"]'
  );
  await couponDescriptionField.fill(couponDescription);
  const couponTypeField = page.locator('//select[@id="discount_type"]');
  await couponTypeField.selectOption("Percentage discount");
  const couponAmountField = page.locator('//input[@id="coupon_amount"]');
  await couponAmountField.fill("10");
  const couponExpiryField = page.locator('//input[@id="expiry_date"]');
  await couponExpiryField.fill("2025-01-22");

  const submitButton = page.locator('//input[@id="publish"]');
  await submitButton.click();
};

module.exports = {
	createCoupon
}
