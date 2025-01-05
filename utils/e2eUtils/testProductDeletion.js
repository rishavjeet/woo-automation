require("dotenv").config();

const removeTestProductRecord = async (admin, page, productTitle) => {
  await admin.visitAdminPage('edit.php','post_type=product');

  const searchProductField = page.locator('//input[@id="post-search-input"]');
  await searchProductField.fill(productTitle);

  const searchSubmitBtn = page.locator('//input[@id="search-submit"]');
  await searchSubmitBtn.click();

  const selectedTestProduct = page.locator(
    '//input[contains(@id,"cb-select-") and contains(@name,"post")]'
  );
  await selectedTestProduct.check();

  const bulkActionSelector = page.locator(
    '//select[@id="bulk-action-selector-top"]'
  );
  await bulkActionSelector.selectOption("Move to Trash");

  const applyBtn = page.locator('//input[@id="doaction"]');
  await applyBtn.click();
};

module.exports = {
	removeTestProductRecord
}
