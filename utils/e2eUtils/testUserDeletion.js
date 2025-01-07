/**
 * Removes a user record from the admin panel based on the provided user name.
 * This function navigates to the user management page, searches for the user by name,
 * selects the user, and then deletes the user record.
 *
 * @async
 * @param {Object} admin - The admin user object (used for authentication, if needed).
 * @param {Object} page - The page object from a browser automation library (e.g., Playwright or Puppeteer).
 * @param {string} userName - The name of the user to be removed.
 *
 * This function performs the following steps:
 * 1. Navigates to the user management page (`users.php`).
 * 2. Searches for the user by their name.
 * 3. Selects the user from the search results.
 * 4. Applies the "Delete" bulk action.
 * 5. Confirms the deletion of the user.
 */

const removeTestUserRecord = async (admin, page, userName) => {
  // Navigate to the user management page within the admin panel
  await admin.visitAdminPage("users.php");

  // Locate the search input field and fill it with the provided user name
  const userSearchField = page.locator('//input[@id="user-search-input"]');
  await userSearchField.fill(userName);

  // Locate and click the search submit button to initiate the search
  const userSearchBtn = page.locator('//input[@id="search-submit"]');
  await userSearchBtn.click();

  // Locate the checkbox for selecting the user from the search results
  const selectUserCheckBox = page.locator('//input[contains(@name,"users")]');
  await selectUserCheckBox.check();

  // Locate the bulk action dropdown and select the "Delete" option
  const bulkActionSelector = page.locator(
    '//select[@id="bulk-action-selector-top"]'
  );
  await bulkActionSelector.selectOption("Delete");

  // Locate and click the "Apply" button to apply the delete action
  const applyBtn = page.locator('//input[@id="doaction"]');
  await applyBtn.click();

  // Locate and click the confirmation button to finalize the user deletion
  const confirmDeletionBtn = page.locator('//input[@id="submit"]');
  await confirmDeletionBtn.click();
};

// Export the function for use in other modules
module.exports = {
  removeTestUserRecord,
};
