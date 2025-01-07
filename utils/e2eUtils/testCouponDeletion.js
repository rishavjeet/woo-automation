/**
 * Removes a coupon record from the admin panel using its coupon code.
 * This function navigates to the coupon management page, searches for the coupon by its code,
 * selects the coupon, and moves it to the trash.
 *
 * @async
 * @param {Object} admin - The admin user object (used for authentication, if needed).
 * @param {Object} page - The page object from a browser automation library (e.g., Playwright or Puppeteer).
 * @param {string} couponCode - The code of the coupon to be removed.
 *
 * This function performs the following steps:
 * 1. Visits the coupon management page in the admin panel.
 * 2. Searches for the coupon by its code.
 * 3. Selects the coupon from the search results.
 * 4. Moves the selected coupon to the trash.
 */

const removeTestCouponRecord = async (admin, page, couponCode) => {
  // Navigate to the coupon management page (admin panel) to manage coupons
  await admin.visitAdminPage(
    "edit.php",
    "post_type=shop_coupon&legacy_coupon_menu=1"
  );

  // Locate the search field where the coupon code can be entered
  const couponSearchField = page.locator('//input[@id="post-search-input"]');
  await couponSearchField.fill(couponCode);

  // Locate and click the search button to find the coupon
  const couponSearchBtn = page.locator('//input[@id="search-submit"]');
  await couponSearchBtn.click();

  // Locate the checkbox for selecting the coupon from search results
  const selectedCouponCheckBox = page.locator(
    '//input[contains(@id,"cb-select-") and contains(@name,"post")]'
  );
  await selectedCouponCheckBox.check();

  // Locate the dropdown selector for bulk actions and choose the "Move to Trash" option
  const bulkActionSelector = page.locator(
    '//select[@id="bulk-action-selector-top"]'
  );
  await bulkActionSelector.selectOption("Move to Trash");

  // Locate and click the "Apply" button to execute the bulk action
  const applyBtn = page.locator('//input[@id="doaction"]');
  await applyBtn.click();
};

// Export the function for use in other modules
module.exports = {
  removeTestCouponRecord,
};
