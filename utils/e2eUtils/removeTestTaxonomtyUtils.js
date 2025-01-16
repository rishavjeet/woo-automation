/**
 * Deletes a taxonomy (e.g., tag or category) from the WordPress admin interface.
 *
 * @param {object} page - Playwright page object for browser interaction.
 * @param {string} taxTitle - The title of the taxonomy to be deleted.
 */

const deleteTestTaxonomy = async(page, taxTitle) =>{

	// Locate the taxonomy search bar by its ID and enter the taxonomy title
	const taxonomySearchBar = page.locator('//input[@id="tag-search-input"]');
	await taxonomySearchBar.fill(taxTitle);

	// Click the search button to find the taxonomy
	const taxSearchBtn = page.locator('//input[@id="search-submit"]');
	await taxSearchBtn.click();

	// Select the checkbox for the found taxonomy
	const selectedTagCheckBox = page.locator('//input[contains(@id,"cb-select-") and contains(@name,"delete_tags")]');
	await selectedTagCheckBox.check();

	// Select "Delete" from the bulk action dropdown menu
	const bulkActionSelector = page.locator('//select[@id="bulk-action-selector-top"]');
	await bulkActionSelector.selectOption('Delete');

	// Click the apply button to perform the delete action
	const applyBtn = page.locator('//input[@id="doaction"]');
	await applyBtn.click();
}

module.exports = {
	deleteTestTaxonomy
}