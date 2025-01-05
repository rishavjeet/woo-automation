const removeTestCouponRecord = async (admin, page, couponCode) => {
  await admin.visitAdminPage(
    "edit.php",
    "post_type=shop_coupon&legacy_coupon_menu=1"
  );

  const couponSearchField = page.locator('//input[@id="post-search-input"]');
  await couponSearchField.fill(couponCode);

  const couponSearchBtn = page.locator('//input[@id="search-submit"]');
  await couponSearchBtn.click();

  const selectedCouponCheckBox = page.locator(
    '//input[contains(@id,"cb-select-") and contains(@name,"post")]'
  );
  await selectedCouponCheckBox.check();

  const bulkActionSelector = page.locator(
    '//select[@id="bulk-action-selector-top"]'
  );
  await bulkActionSelector.selectOption("Move to Trash");

  const applyBtn = page.locator('//input[@id="doaction"]');
  await applyBtn.click();
};


module.exports = {
	removeTestCouponRecord
}