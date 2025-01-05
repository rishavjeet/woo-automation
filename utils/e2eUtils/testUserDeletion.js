const removeTestUserRecord = async (admin, page, userName) => {
  await admin.visitAdminPage("users.php");

  const userSearchField = page.locator('//input[@id="user-search-input"]');
  await userSearchField.fill(userName);

  const userSearchBtn = page.locator('//input[@id="search-submit"]');
  await userSearchBtn.click();

  const selectUserCheckBox = page.locator('//input[contains(@name,"users")]');
  await selectUserCheckBox.check();

  const bulkActionSelector = page.locator(
    '//select[@id="bulk-action-selector-top"]'
  );
  await bulkActionSelector.selectOption("Delete");

  const applyBtn = page.locator('//input[@id="doaction"]');
  await applyBtn.click();

  const confirmDeletionBtn = page.locator('//input[@id="submit"]');
  await confirmDeletionBtn.click();
};

module.exports = {
	removeTestUserRecord
}
