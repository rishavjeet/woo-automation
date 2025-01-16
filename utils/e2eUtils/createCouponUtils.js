/**
 * createCoupon - Automates the process of creating a new coupon in WordPress admin.
 *
 * @param {object} admin - The admin object used to perform admin-specific operations.
 * @param {object} page - The Playwright page object for interacting with the browser.
 * @param {string} couponCode - The unique code for the coupon to be created.
 * @param {string} couponDescription - A description of the coupon to describe its purpose or usage.
 *
 * @description
 * This function automates the creation of a coupon in the WordPress admin panel by:
 * - Navigating to the "Add New Coupon" page.
 * - Filling in necessary fields such as coupon code, description, type, discount amount, and expiry date.
 * - Publishing the coupon to make it available for use.
 *
 * @example
 * const { createCoupon } = require('./createCouponUtils');
 * await createCoupon(admin, page, 'SAVE10', 'Save 10% on your next order');
 */

const createCoupon = async (admin, page, couponCode, couponDescription) => {
  // Navigate to the "Add New Coupon" page in the WordPress admin dashboard
  await admin.visitAdminPage("post-new.php", "post_type=shop_coupon");

  // Fill in the coupon code field with the provided code
  const couponCodeField = page.locator('//input[@id="title"]');
  await couponCodeField.fill(couponCode);

  // Fill in the coupon description field with the provided description
  const couponDescriptionField = page.locator(
    '//textarea[@id="woocommerce-coupon-description"]'
  );
  await couponDescriptionField.fill(couponDescription);

  // Select "Percentage discount" as the coupon type
  const couponTypeField = page.locator('//select[@id="discount_type"]');
  await couponTypeField.selectOption("Percentage discount");

  // Enter the discount amount (e.g., 10%)
  const couponAmountField = page.locator('//input[@id="coupon_amount"]');
  await couponAmountField.fill("10");

  // Set an expiry date for the coupon (e.g., "2025-01-22")
  const couponExpiryField = page.locator('//input[@id="expiry_date"]');
  await couponExpiryField.fill("2025-01-22");

  // Click the "Publish" button to save and activate the coupon
  const submitButton = page.locator('//input[@id="publish"]');
  await submitButton.click();
};

module.exports = {
  createCoupon,
};
