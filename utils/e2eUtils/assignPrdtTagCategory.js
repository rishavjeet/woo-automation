/**
 * Utility function for assigning category and tag to the product
 * 
 * @param {object} page - Playwright's Page object representing the browser page.
 * @param {string} catName - Category Name
 * @param {string} tagName - Tag Name
 */

const assignTagCategory = async (page, tagName, categoryCheckBox) => {

  await categoryCheckBox.check();

  // Search for the category and add it
  const tagOption = page.locator('//input[@id="new-tag-product_tag"]');
  await tagOption.fill(tagName);

  // Locate and click on the 'Add' button
  const addTagBtn = page.locator('//input[@value="Add"]');
  await addTagBtn.click();

  // wait for the tag to be added
  await page.waitForTimeout(2000);

  // Locate the 'Update' button and click it to save the changes
  const updateButton = page.locator('//input[@id="publish"]');
  await updateButton.click();
};

module.exports = {
	assignTagCategory
}
