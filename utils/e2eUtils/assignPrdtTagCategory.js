/**
 * Utility function for assigning category and tag to the product
 * 
 * @param {object} page - Playwright's Page object representing the browser page.
 * @param {string} catName - Category Name
 * @param {string} tagName - Tag Name
 */

const assignTagCategory = async (page, catName, tagName) => {
  const categoryCheckBox = page.locator(
    `//label[@class="selectit" and contains(text(),"${catName}")]//input[contains(@id,"in-product_cat-")]`
  );
  await categoryCheckBox.check();

  const tagOption = page.locator('//input[@id="new-tag-product_tag"]');
  await tagOption.fill(tagName);

  const addTagBtn = page.locator('//input[@value="Add"]');
  await addTagBtn.click();

  // Locate the 'Update' button and click it to save the changes
  const updateButton = page.locator('//input[@id="publish"]');
  await updateButton.click();
};

module.exports = {
	assignTagCategory
}
