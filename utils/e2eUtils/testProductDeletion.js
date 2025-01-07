require("dotenv").config();

/**
 * Removes a product record from the admin panel using its product title.
 * This function navigates to the product management page, searches for the product by its title,
 * selects the product, and moves it to the trash.
 *
 * @async
 * @param {Object} admin - The admin user object (used for authentication, if needed).
 * @param {Object} page - The page object from a browser automation library (e.g., Playwright or Puppeteer).
 * @param {string} productTitle - The title of the product to be removed.
 *
 * This function performs the following steps:
 * 1. Visits the product management page in the admin panel.
 * 2. Searches for the product by its title.
 * 3. Selects the product from the search results.
 * 4. Moves the selected product to the trash.
 */

const removeTestProductRecord = async (admin, page, productTitle) => {
  // Navigate to the product management page in the admin panel
  await admin.visitAdminPage("edit.php", "post_type=product");

  // Locate the search field to find the product by its title
  const searchProductField = page.locator('//input[@id="post-search-input"]');
  await searchProductField.fill(productTitle);

  // Locate and click the search submit button to perform the search
  const searchSubmitBtn = page.locator('//input[@id="search-submit"]');
  await searchSubmitBtn.click();

  // Locate the checkbox for selecting the product from search results
  const selectedTestProduct = page.locator(
    '//input[contains(@id,"cb-select-") and contains(@name,"post")]'
  );
  await selectedTestProduct.check();

  // Locate the dropdown menu for bulk actions and choose the "Move to Trash" option
  const bulkActionSelector = page.locator(
    '//select[@id="bulk-action-selector-top"]'
  );
  await bulkActionSelector.selectOption("Move to Trash");

  // Locate and click the "Apply" button to move the selected product to trash
  const applyBtn = page.locator('//input[@id="doaction"]');
  await applyBtn.click();
};

// Export the function for use in other modules
module.exports = {
  removeTestProductRecord,
};
